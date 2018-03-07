import express from "express"
import * as PostsController from "../Controllers/PostsController"
const Router = express.Router();


Router.get('/post/', PostsController.index)
Router.get('/post/get', PostsController.get)

Router.post('/post/add', PostsController.add)
Router.post('/post/getByCategory', PostsController.getByCategory)

Router.put('/post/addRating', PostsController.addRating)
Router.put('/post/update', PostsController.update)

Router.delete("/post/delete", PostsController.remove)

export default Router