import mongoose, {Schema} from "mongoose"
import UniqueValidator from "mongoose-unique-validator"

const HomeModel = new Schema({
    title: {
        type: String,
        trim: true,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    author: {
        type: String,
        trim: true
    },
    data: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("HomeModel", HomeModel)