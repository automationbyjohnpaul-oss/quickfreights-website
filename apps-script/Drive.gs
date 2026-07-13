/**
 * ============================================================
 * Quick Freights Global Limited
 * Drive Module
 * ------------------------------------------------------------
 * Module: Drive
 * Version: 7.0
 *
 * PURPOSE
 * -------
 * - Create and manage attachment folders
 * - Save uploaded files to Drive
 * - Generate shareable file links
 * - File type validation against CONFIG.DRIVE SSOT
 *
 * CHANGELOG
 * ---------
 * v7.0 - SSOT cleanup: CONFIG.STORAGE→CONFIG.DRIVE,
 *        removed DOC/DOCX, dynamic error messages
 * ============================================================
 */

/**
 * Strip Data URL prefix defensively
 */
function _stripDataUrlPrefix_(base64Data) {
    if (!base64Data) return '';
    return base64Data.replace(/^data:.*;base64,/, '');
}

/**
 * Get MIME type from file name extension
 * FIXED: Removed DOC/DOCX — PDF, JPG, PNG only
 */
function _getMimeTypeFromFileName_(fileName) {
    if (!fileName) return 'application/octet-stream';
    const extension = fileName.split('.').pop().toLowerCase();
    const extensionMap = {
        'pdf': 'application/pdf',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png'
    };
    return extensionMap[extension] || 'application/octet-stream';
}

/**
 * Generate a safe file name for Drive storage
 */
function _generateSafeFileName_(originalFileName, trackingId, customerName, timestamp) {
    const safeName = (customerName || 'CUSTOMER')
        .trim()
        .replace(/[^a-zA-Z0-9]/g, '_')
        .replace(/_+/g, '_')
        .substring(0, 20);
    const ts = timestamp || new Date();
    const timestampStr = Utilities.formatDate(ts, 'Africa/Lagos', 'yyyyMMdd_HHmmss');
    const extension = originalFileName.split('.').pop().toLowerCase();
    return trackingId + '_' + timestampStr + '_' + safeName + '.' + extension;
}

/**
 * Validate file type against CONFIG.DRIVE SSOT
 * FIXED: Uses CONFIG.DRIVE.ALLOWED_TYPES, dynamic error message
 */
function _validateFileType_(fileName, mimeType) {
    const allowedTypes = CONFIG.DRIVE.ALLOWED_TYPES || [];

    if (mimeType && allowedTypes.indexOf(mimeType) !== -1) {
        return { valid: true };
    }

    if (fileName) {
        const extension = fileName.split('.').pop().toLowerCase();
        const extensionMap = {
            'pdf': 'application/pdf',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png'
        };
        if (extensionMap[extension] && allowedTypes.indexOf(extensionMap[extension]) !== -1) {
            return { valid: true };
        }
        return {
            valid: false,
            error: 'Unsupported file type: .' + extension + '. Allowed: PDF, JPG, PNG'
        };
    }
    return { valid: false, error: 'Invalid or unknown file type.' };
}

// ============================================================
// PUBLIC FUNCTIONS
// ============================================================

/**
 * Save an attachment to Google Drive
 * FIXED: Uses CONFIG.DRIVE instead of CONFIG.STORAGE
 */
function saveAttachment(base64Data, fileName, mimeType, trackingId, customerName, timestamp) {
    try {
        if (!base64Data) return { success: false, error: 'No file data provided.' };
        if (!fileName) return { success: false, error: 'No file name provided.' };
        if (!trackingId) return { success: false, error: 'No tracking ID provided.' };

        const cleanBase64 = _stripDataUrlPrefix_(base64Data);
        if (!cleanBase64) return { success: false, error: 'File data is empty.' };

        // Validate file type using CONFIG.DRIVE SSOT
        const validation = _validateFileType_(fileName, mimeType);
        if (!validation.valid) return { success: false, error: validation.error };

        // Validate file size using CONFIG.DRIVE SSOT
        const estimatedSize = Math.ceil((cleanBase64.length * 3) / 4);
        const maxSize = CONFIG.DRIVE.MAX_FILE_SIZE || 10 * 1024 * 1024;
        if (estimatedSize > maxSize) {
            return {
                success: false,
                error: 'File exceeds the maximum size of ' + (maxSize / 1024 / 1024).toFixed(0) + ' MB.'
            };
        }

        const folder = getOrCreateAttachmentFolder();
        if (!folder) return { success: false, error: 'Could not access attachments folder.' };

        const safeFileName = _generateSafeFileName_(fileName, trackingId, customerName, timestamp);

        let bytes;
        try { bytes = Utilities.base64Decode(cleanBase64); }
        catch (e) { return { success: false, error: 'Failed to decode file: ' + e.message }; }

        const finalMimeType = mimeType || _getMimeTypeFromFileName_(fileName);
        let blob;
        try { blob = Utilities.newBlob(bytes, finalMimeType, safeFileName); }
        catch (e) { return { success: false, error: 'Failed to create blob: ' + e.message }; }

        let file;
        try { file = folder.createFile(blob); }
        catch (e) { return { success: false, error: 'Failed to upload: ' + e.message }; }

        try { file.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.VIEW); }
        catch (e) { Logger.log('Warning: Could not set sharing: ' + e.message); }

        Logger.log('✅ File uploaded:', { fileName: safeFileName, fileId: file.getId(), size: file.getSize() });

        return {
            success: true,
            fileUrl: file.getUrl(),
            fileId: file.getId(),
            fileName: safeFileName,
            fileSize: file.getSize(),
            mimeType: finalMimeType
        };
    } catch (error) {
        Logger.log('❌ saveAttachment error:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Save multiple attachments (future-proofing)
 */
function saveMultipleAttachments(attachments, trackingId, customerName) {
    const results = [];
    const timestamp = new Date();
    attachments.forEach(function(att, i) {
        results.push(saveAttachment(att.base64Data, att.fileName, att.mimeType, trackingId + '-' + String(i+1).padStart(2,'0'), customerName, timestamp));
    });
    return results;
}

// ============================================================
// FOLDER MANAGEMENT
// ============================================================

/**
 * Get or create the attachments folder
 */
function getOrCreateAttachmentFolder() {
    const folderName = CONFIG.DRIVE.ROOT_FOLDER || 'QuickFreights_Attachments';
    const cacheKey = 'QF_ATTACHMENT_FOLDER_ID';
    const props = PropertiesService.getScriptProperties();

    const cachedId = props.getProperty(cacheKey);
    if (cachedId) {
        try { const f = DriveApp.getFolderById(cachedId); if (f) return f; }
        catch (e) { props.deleteProperty(cacheKey); }
    }

    try {
        const folders = DriveApp.getFoldersByName(folderName);
        if (folders.hasNext()) { const f = folders.next(); props.setProperty(cacheKey, f.getId()); return f; }
    } catch (e) { Logger.log('Folder search error:', e.message); }

    try {
        const newFolder = DriveApp.createFolder(folderName);
        props.setProperty(cacheKey, newFolder.getId());
        return newFolder;
    } catch (e) {
        Logger.log('Folder creation error:', e.message);
        return null;
    }
}

function getFolderById(folderId) {
    try { return DriveApp.getFolderById(folderId); }
    catch (e) { return null; }
}

function getOrCreateSubfolder(parentFolderId, subfolderName) {
    const parent = getFolderById(parentFolderId);
    if (!parent) return null;
    try {
        const folders = parent.getFoldersByName(subfolderName);
        if (folders.hasNext()) return folders.next();
        return parent.createFolder(subfolderName);
    } catch (e) { return null; }
}

// ============================================================
// FILE MANAGEMENT
// ============================================================

function deleteFile(fileId) {
    try { DriveApp.getFileById(fileId).setTrashed(true); return true; }
    catch (e) { return false; }
}

function getFileInfo(fileId) {
    try {
        const f = DriveApp.getFileById(fileId);
        return { id: f.getId(), name: f.getName(), size: f.getSize(), mimeType: f.getMimeType(), url: f.getUrl(), created: f.getDateCreated(), updated: f.getLastUpdated() };
    } catch (e) { return null; }
}

// ============================================================
// TEST FUNCTIONS
// ============================================================

function testDriveModule() {
    Logger.log('=== Testing Drive Module ===');
    Logger.log('Max Upload Size:', CONFIG.DRIVE.MAX_FILE_SIZE);
    Logger.log('Allowed Types:', CONFIG.DRIVE.ALLOWED_TYPES);
    Logger.log('Root Folder:', CONFIG.DRIVE.ROOT_FOLDER);

    const folder = getOrCreateAttachmentFolder();
    if (!folder) { Logger.log('❌ Failed to access folder'); return; }
    Logger.log('✅ Folder ready:', folder.getName());

    const blob = Utilities.newBlob('Quick Freights test file', 'text/plain', 'test_file.txt');
    const file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.VIEW);
    Logger.log('✅ Test file uploaded:', file.getUrl());
    file.setTrashed(true);
    Logger.log('✅ Test file cleaned up');
    Logger.log('=== Drive Module Test Complete ===');
}

function testFileUpload() {
    Logger.log('=== Testing File Upload ===');
    const base64Data = Utilities.base64Encode('Hello World - Quick Freights Test');
    const result = saveAttachment(base64Data, 'test_upload.txt', 'text/plain', 'QF-TEST-001', 'Test Customer');
    if (result.success) {
        Logger.log('✅ Upload successful:', result.fileUrl);
        deleteFile(result.fileId);
    } else {
        Logger.log('❌ Upload failed:', result.error);
    }
    Logger.log('=== File Upload Test Complete ===');
}