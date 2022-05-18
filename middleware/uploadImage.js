const multer = require('multer');
const AWS = require('aws-sdk');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage});

async function uploadS3(Key, Body){
    
    var s3 = new AWS.S3({
        accessKeyID: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
    
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: Key,
        Body: Body,
    }
    
    const uploadImage = s3.upload(params)
    
    var promise = uploadImage.promise();
    
    promise.then(
        function(data) {
            console.log("Imagem carregada com sucesso");
        },
        function(err) {
            return console.log("Houve um erro no envio: ", err.message);
        }
    );
}

module.exports = {upload, uploadS3};