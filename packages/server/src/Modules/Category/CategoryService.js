import CategoryModel from "./CategopryModel"

class CategoryService {
    addCategory({title, description}) {

        if(!title && !description) throw new Error("No Title or Description was submitted")

        try{
            return CategoryModel.create({title, description})
        }catch(err){
            return err
        }
    }
    /*
        @TODO Create better validation and sanitize
     */
    updateCategory({id, title, description}) {
        if(!id) throw new Error("No category to update")
        if(!title && !description) throw new Error("No fields to update submitted")

        try {
            if (!description)
                return CategoryModel.findOneAndUpdate({_id: id}, {$set: {title},}, {new: true})
            else if (!title)
                return CategoryModel.findOneAndUpdate({_id: id}, {$set: {description}}, {new: true})
            else
                return CategoryModel.findOneAndUpdate({_id: id}, {$set: {title, description}}, {new: true})
        } catch (err) {
            return err
        }
    }
}

export default new CategoryService()