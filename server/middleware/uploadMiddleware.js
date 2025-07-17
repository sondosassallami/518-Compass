const multer = require('multer');
const path = require('path');

// Set destination and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save files to the 'uploads' folder inside the server folder
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Only accept images
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg, .jpeg, .png files allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
