import express from "express"
import * as AuthController from "../Contollers/AuthController"
import AuthService from '../Modules/Auth/AuthService'

const Router = express.Router()

Router.get('/', AuthController.index)
Router.get('/checkAuth', AuthService.authMiddleware, (req, res) => res.status(200).json("Successfully logged in"))

Router.post("/addUser", AuthController.addUser)
Router.post('/login', AuthService.loggingMiddleware, AuthController.login)



export default Router
