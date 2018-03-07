import express from "express"
import * as CategoryController from "../Controllers/CategoryController"

const Router = express.Router()

Router.get('/category/', CategoryController.index)
Router.get("/category/getCategories", CategoryController.getAll)

Router.post('/category/addCategory', CategoryController.add)

Router.put('/category/updateCategory', CategoryController.update)

Router.delete('/category/deleteCategory', CategoryController.deleteOne)

export default Router