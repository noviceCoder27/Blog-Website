const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
require('dotenv').config();


const accessKey = process.env.AWS_ACCESS_KEY_ID;
const accessKeySecret = process.env.AWS_ACCESS_KEY_SECRET;
const bucketName = process.env.AWS_BUCKET_NAME;
const myRegion = process.env.AWS_REGION;
 
const fileFilter = (req,file,cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        cb(null,true);
    } else {
        cb(null,false)
    }
}


//create S3 instance to upload to Aws s3

const s3 = new S3Client({
    credentials: {
        accessKeyId : accessKey,
        secretAccessKey: accessKeySecret,
        region: myRegion
    }
});

//create upload instance 
const upload = multer({
storage: multerS3({
    s3: s3,
    bucket: bucketName,
//   acl: 'public-read', // if region doesn't support Access Control List
    key: function (req, file, cb) {
        cb(null, `${req.user._id}/${Date.now().toString()}-${file.originalname}`)
    }
}),
fileFilter: fileFilter,
});


module.exports = upload;