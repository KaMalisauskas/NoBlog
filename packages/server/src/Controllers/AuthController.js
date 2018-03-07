import UserService from '../Modules/Auth/UserService'
import UserModel from "../Modules/Auth/UserModel"
import Helper from "./Helper"

export const index = (req, res) => Helper.successHandler("Welcome to Auth Route of NoBlog API", res)

export const addUser = async (req, res) => {
    try{
        const User = await UserService.addUser(req.body)
        Helper.successHandler(User.toJson(), res)
    } catch(err) {
       Helper.errorHandler(String(err), 400, res)
    }
}

export const login = (req, res, next) => {
    Helper.successHandler(req.user.toAuthJson(), res)
    return next()
}

export const adminLogin = async (req, res, next) => {
    if(!UserService.isAdmin(req.user))  return Helper.errorHandler("User doesn't have admin privilege", 400, res)
    Helper.successHandler(req.user.toAuthJson(), res)
    return next()
}

export const updateUser = async (req,res) => {
    try{
        const Update = await UserService.updateUser(req.body)
        Helper.successHandler(Update, res)
    } catch(err) {
        Helper.errorHandler(String(err), 400, res)
    }
}

export const deleteUser = async (req, res) => {
    const username = req.body.username
    try {
        const User = await UserModel.findOneAndRemove({username})
        if(!User) throw new Error("User does not exist")
        Helper.successHandler(`User ${user.username} successfully deleted`, res)

    } catch (err) {
        Helper.errorHandler(String(err), 400, res)
    }
}