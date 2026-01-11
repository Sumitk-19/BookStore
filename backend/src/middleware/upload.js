const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname);
  if (![".jpg", ".jpeg", ".png"].includes(ext)) {
    cb(new Error("Images only"), false);
  }
  cb(null, true);
}

const upload = multer({ storage, fileFilter });

module.exports = upload;
