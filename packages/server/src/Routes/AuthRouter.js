import express from "express"
import * as AuthController from "../Controllers/AuthController"
import AuthService from '../Modules/Auth/UserService'

const Router = express.Router()

Router.get('/auth/', AuthController.index)
Router.get('/auth/checkAuth', AuthService.authMiddleware, (req, res) => res.status(200).json(req.user))


Router.post("/auth/addUser", AuthController.addUser)
Router.post('/auth/login', AuthService.loggingMiddleware, AuthController.login)
Router.post('/auth/adminLogin', AuthService.loggingMiddleware, AuthController.adminLogin)

Router.put("/auth/updateUser", AuthController.updateUser)

Router.delete('/auth/deleteUser', AuthController.deleteUser)

export default Router
