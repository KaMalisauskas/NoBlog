import UserService from '../Modules/Auth/UserService'
import UserModel from "../Modules/Auth/UserModel"


export const index = (req, res) => res.status(200).json({
    success: "true",
    message: "Welcome to Auth Route of NoBlog API"
})

export const addUser = async (req, res) => {
    try{
        const User = await UserService.addUser(req.body)
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

export const adminLogin = async (req, res, next) => {
    if(!UserService.isAdmin(req.user)) return res.status(400).json({
        success: false,
        error: "User doesn't have admin privilege"
    })
    res.status(200).json({
        success: true,
        data: req.user.toAuthJson()
    })
    return next()
}

export const updateUser = async (req,res) => {
    try{
        const Update = await UserService.updateUser(req.body)
        res.status(200).json({
            success: true,
            data: Update
        })
    } catch(err) {
        res.status(400).json({
            success:false,
            error: String(err)
        })
    }
}

export const deleteUser = async (req, res) => {
    const username = req.body.username
    try {
        const User = await UserModel.findOneAndRemove({username})
        if(!User) return res.status(404).json({
            success: false,
            error: "User does not exist"
        })
        res.status(200).json({
            success: true,
            data: `User ${user.username} successfully deleted`
        })

    } catch (err) {
        res.status(400).json({
            success:false,
            error: String(err)
        })
    }
}