import mongoose, {Schema} from "mongoose"
import UniqueValidator from "mongoose-unique-validator"

const CategoryModel = new Schema({
    title: {
        type: String,
        trim: true,
        unique: true,
        require: true
    },
    description: {
        type: String,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

CategoryModel.plugin(UniqueValidator, {
    message: `{VALUE} Is not unique`
})

export default mongoose.model("CategoryModel", CategoryModel)