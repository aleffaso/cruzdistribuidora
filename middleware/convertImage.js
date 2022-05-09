const imageToBase64 = require('image-to-base64');

function convertImage(req, res){

    const figure = imageToBase64("public/upload/figura.png")

    if (figure){
        console.log(figure)
    }else{
        res.status(200);
    }
};

module.exports = convertImage;