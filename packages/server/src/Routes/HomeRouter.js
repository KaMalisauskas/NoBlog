import express from "express"
import * as HomeController from "../Controllers/HomeController"
const Router = express.Router()

Router.get('/homeRoute', HomeController.index)
Router.get('/homeRoute/get', HomeController.get)

Router.post('/homeRoute/add', HomeController.add)

Router.put("/homeRoute/update", HomeController.update)


export default Router