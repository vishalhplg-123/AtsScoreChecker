const multer = require('multer');
const path = require('path');

// Configure in-memory storage for parsing without cluttering disk
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const filetypes = /pdf|docx|msword|vnd.openxmlformats-officedocument.wordprocessingml.document/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.mimetype === 'application/msword' ||
    file.mimetype === 'application/octet-stream';

  if (extname || mimetype) {
    return cb(null, true);
  }
  cb(new Error('Please upload a PDF or DOCX file under 5MB.'));
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter,
});

module.exports = upload;
