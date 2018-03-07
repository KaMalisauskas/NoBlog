import express from "express"
import * as PostsController from "../Controllers/PostsController"
const Router = express.Router();


Router.get('/', PostsController.index)


export default Router