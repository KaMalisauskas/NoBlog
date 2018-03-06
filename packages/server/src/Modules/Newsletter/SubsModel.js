import mongoose, {Schema} from "mongoose"
import UniqueValidator from "mongoose-unique-validator"

const SubsModel = new Schema({
    email: {
        type: String,
        trim: true,
        unique: true
    },
    data: {
        type: Date,
        default: Date.now
    }
})

SubsModel.plugin(UniqueValidator, {
    message: `{VALUE} is already subscribed`
})

export default mongoose.model("SubsModel", SubsModel)