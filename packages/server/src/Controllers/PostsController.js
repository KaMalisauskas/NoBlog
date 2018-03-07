import Helper from "./Helper"
import PostsService from "../Modules/Posts/PostsService"

export const index = (req, res) => Helper.successHandler("Welcome to PostsRouter of NoBlog API", req)

export const add = async (req, res) => {
    try{
        const AddPost = await PostsService.add(req.body)
        Helper.successHandler(AddPost, res)
    } catch(err) {
        Helper.errorHandler(String(err), 400, res)
    }
}

export const addRating = async (req, res) => {
    try{
        const AddRating = await PostsService.addRating(req.body)

        Helper.successHandler(AddRating, res)
    } catch(err) {
        Helper.errorHandler(String(err), 400, res)
    }
}

export const get = async (req, res) => {
    try{
        const Posts = await PostsService.get()
        console.log(Posts)
        Helper.successHandler(Posts, res)
    } catch(error) {
        Helper.errorHandler(String(error), 400, res)
    }
}

export const getByCategory = async (req, res) => {
    try{
        const PostsByCategory = await PostsService.getByCategory(req.body)
    } catch(error) {
        Helper.errorHandler(String(error), 400, res)
    }
}

export const update = async (req, res) => {
    try{
        const UpdatePost = await PostsService.update(req.body)
        if(!UpdatePost) throw new Error('No Post by given ID')
        Helper.successHandler(UpdatePost, res)
    } catch (err) {
        Helper.errorHandler(String(err), 400, res)
    }
}

export const remove = async (req, res) => {
    try{
        const RemovePost = await PostsService.remove(req.body)
        if(!RemovePost) throw new Error("No Post by given ID")
        Helper.successHandler(`Post by id ${req.body.id} removed successfully!`, res)
    } catch(err) {
        Helper.errorHandler(String(err), 400, res)
    }
}