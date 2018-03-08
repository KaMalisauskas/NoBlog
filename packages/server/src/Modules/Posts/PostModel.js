import mongoose, {Schema} from "mongoose"
import UniqueValidator from "mongoose-unique-validator"

const PostModel = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    text: {
        type: String,
        required: true,
    },
    authorId: {
        type: Schema.Types.ObjectId,
    },
    categoryId: {
        type: Schema.Types.ObjectId
    },
    rating: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
})

PostModel.plugin(UniqueValidator, {
    message: `{VALUE} is already exists`
})

export default mongoose.model("PostModel", PostModel)