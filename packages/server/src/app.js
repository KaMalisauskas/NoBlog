import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import connect from "./DB/connect"

//routers
import AuthRouter from './Routes/AuthRouter'
import NewsletterRouter from "./Routes/NewsletterRouter"

import "babel-polyfill";

const app = express()

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//Index of API
app.get("/", (req, res) => res.status(200).json({
    success: true,
    message: "Welcome to NoBlog API"
}))

//Routers that are used
app.use('/auth', AuthRouter)
app.use('/newsletter', NewsletterRouter)

export default app