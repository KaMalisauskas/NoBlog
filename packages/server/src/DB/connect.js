import mongoose from "mongoose"
import config from "../config.json"
const connect =  mongoose.connect(`mongodb://${config.mongoose.user}:${config.mongoose.password}@ds157528.mlab.com:57528/noblog`,
    (err) => {
        if(err) console.log(err)
        else console.log("<<<< MongoDb is connected")
})