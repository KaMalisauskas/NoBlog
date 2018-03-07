import express from "express"
import * as CategoryController from "../Controllers/CategoryController"

const Router = express.Router()

Router.get('/', CategoryController.index)

export default Router