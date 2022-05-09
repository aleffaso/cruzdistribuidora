const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/upload');
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, "figura" + path.extname(file.originalname))
    },
});

const upload = multer({ storage: storage});

module.exports = upload;