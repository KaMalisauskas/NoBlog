import AuthService from '../Modules/Auth/AuthService'
import UserModel from "../Modules/Auth/UserModel"

export const index = (req, res) => res.status(200).json({
    success: "true",
    message: "Welcome to Auth Route of NoBlog API"
})

export const addUser = async (req, res) => {
    try{
        const User = await AuthService.addUser(req.body)
        res.status(200).json({
            success: true,
            data: User.toJson()
        })
    } catch(err) {
        return res.status(400).json({
            success: false,
            error: String(err)
        })
    }
}

export const login = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: req.user.toAuthJson()
    })
    return next()
}