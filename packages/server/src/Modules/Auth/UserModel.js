import mongoose, {Schema} from "mongoose"
import {hashSync, compareSync} from "bcrypt-nodejs"
import jwt from "jsonwebtoken"
import UniqueValidator from "mongoose-unique-validator"
import config from "../../config.json"

const UserSchema = new Schema({
    username: {
        trim: true,
        unique: true,
        required: true,
        type: String
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: Boolean,
        default: false
    }
})

UserSchema.plugin(UniqueValidator, {
    message: `{VALUE} already exist!`
})

UserSchema.pre("save", function(next) {
    if(!this.isModified()) return next()
    this.password = this._hashSync(this.password)
    return next()
})

UserSchema.methods = {
    _hashSync(password) {
        return hashSync(password)
    },
    comparePassword(password) {
        return compareSync(password, this.password)
    },
    createToken() {
        return jwt.sign({_id: this._id}, config.passport.secret)
    },
    toAuthJson() {
        return {
            token: this.createToken(),
            ...this.toJson()
        }
    },
    toJson() {
        return {
            _id: this._id,
            username: this.username,
            email: this.email,
            admin: this.admin
        }
    }
}

export default mongoose.model("User", UserSchema)