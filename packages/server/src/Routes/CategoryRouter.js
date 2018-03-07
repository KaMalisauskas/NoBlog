import express from "express"
import * as CategoryController from "../Controllers/CategoryController"

const Router = express.Router()

Router.get('/', CategoryController.index)
Router.get("/getCategories", CategoryController.getAll)

Router.post('/addCategory', CategoryController.add)

Router.put('/updateCategory', CategoryController.update)

export default Router