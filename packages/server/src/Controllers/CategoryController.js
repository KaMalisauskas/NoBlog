import CategoryService from "../Modules/Category/CategoryService"
import CategoryModel from "../Modules/Category/CategopryModel"
import Helper from "./Helper"

export const index = (req, res) => Helper.successHandler("Welcome to Category route of NoBlog API", res)

export const add = async (req, res) => {
    try{
        const AddCategory = await CategoryService.addCategory(req.body)
        Helper.successHandler("Category added successfully", res)
    }catch(err) {
        Helper.errorHandler(String(err), 400, res)
    }
}

export const update = async (req, res) => {
    try {
        const UpdateCategory = await CategoryService.updateCategory(req.body)
        Helper.successHandler(UpdateCategory, res)
    } catch (err) {
        Helper.errorHandler(String(err), 400, res)
    }
}

export const getAll = async (req, res) => {
    try{
        const AllCategories = await CategoryModel.find()
        if(!AllCategories.length) throw new Error("No categories exist")
        Helper.successHandler(AllCategories, res)
    } catch(err) {
        Helper.errorHandler(String(err), 400, res)
    }
}