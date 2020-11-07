const multer = require('multer');

const maxFileSize = 1 * 1000 * 1000;
const filteredFile = function (req, file, cb) {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/webp' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

exports.upload = () =>
  multer({
    storage: storage,
    fileFilter: filteredFile,
    limits: { fileSize: maxFileSize },
  });
