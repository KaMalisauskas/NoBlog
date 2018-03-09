import Config from "../config.json"
import AWS from "aws-sdk"

class Helper {
    errorHandler(err, status, res) {
        return res.status(status).json({
            success: false,
            error: String(err)
        })
    }
    successHandler(msg, res) {
        return res.status(200).json({
            success: true,
            data: msg
        })
    }
     uploadToS3(data, filename) {
        let s3bucket = new AWS.S3({
            accessKeyId: Config.AWS.accessKey,
            secretAccessKey: Config.AWS.secret,
            Bucket: "noblogpostimage"
        })
        s3bucket.createBucket( async () => {
            let params = {
                Bucket: "noblogpostimage",
                ACL: "public-read",
                Key: filename,
                Body: data
            }
            console.log(filename)
            s3bucket.upload(params, function (err, data) {
                if (err) throw err
                return data
            });
        })
    }


}

export default new Helper()