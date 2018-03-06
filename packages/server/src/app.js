import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import connect from "./DB/connect"
import "babel-polyfill";

const app = express()

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get("/", (req, res) => res.status(200).json({
    success: true,
    message: "Welcome to NoBlog API"
}))

export default app