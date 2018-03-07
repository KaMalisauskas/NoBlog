import express from "express"
import * as PostsController from "../Controllers/PostsController"
const Router = express.Router();


Router.get('/post/', PostsController.index)


export default Router