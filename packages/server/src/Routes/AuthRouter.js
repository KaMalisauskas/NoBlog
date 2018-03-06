import express from "express"
import * as AuthController from "../Contollers/AuthController"
import AuthService from '../Modules/Auth/UserService'

const Router = express.Router()

Router.get('/', AuthController.index)
Router.get('/checkAuth', AuthService.authMiddleware, (req, res) => res.status(200).json(req.user))


Router.post("/addUser", AuthController.addUser)
Router.post('/login', AuthService.loggingMiddleware, AuthController.login)
Router.post('/adminLogin', AuthService.loggingMiddleware, AuthController.adminLogin)

Router.put("/updateUser", AuthController.updateUser)

Router.delete('/deleteUser', AuthController.deleteUser)

export default Router
