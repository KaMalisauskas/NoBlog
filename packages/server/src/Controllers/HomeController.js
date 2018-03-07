import Helper from "./Helper"
import HomeModel from "../Modules/Home/HomeModel"
import HomeService from "../Modules/Home/HomeService"

export const index = (req, res) => Helper.successHandler("Welcome to Home route of NoBlog API")

export const get = async (req, res) => {
    try{
        const GetHome = await HomeModel.findOne()
        if(!GetHome) throw new Error("No Home Found")
        Helper.successHandler(GetHome, res)
    } catch(err) {
        Helper.errorHandler(String(err), 400, res)
    }
}

export const add = async (req, res) => {
    //dropping all documents adding
    try{
        await HomeModel.remove()
        const AddHomeInfo = await HomeService.add(req.body)
        Helper.successHandler(AddHomeInfo, res)
    }catch(err) {
        Helper.errorHandler(String(err), 400, res)
    }
}

export const update = async (req, res) => {
    try{
        const UpdateHome = await HomeService.update(req.body)
        if(!UpdateHome) throw new Error("Nothing found by this id")
        Helper.successHandler(UpdateHome, res)
    } catch(err) {
        Helper.errorHandler(String(err), 400, res)
    }
}