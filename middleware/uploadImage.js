const multer = require('multer');

const filePath = './public/upload';
const fileName = '.jpg';
const data = Date.now().toString();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, filePath);
    },
    filename: (req, file, cb) => {
        cb(null, data.slice(0,8) + fileName)
    },
});

const upload = multer({ storage: storage});

module.exports = upload;