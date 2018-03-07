import HomeModel from "./HomeModel"

class HomeService {
    /*
        @ToDo Add validation and sanitize
     */
    add({title, text, author}) {
        if(!text && !title && !author) throw new Error("No Fields have been submitted")

        try{
            return HomeModel.create({title, text, author})
        } catch(err) {
            return err
        }
    }

    update({id, title, text, author}) {
        if(!id) throw new Error('No id submitted')
        if(!title && !text && !author) throw new Error("No fields submitted to update")

        try{
            if(!text && !author)
                return HomeModel.findOneAndUpdate({_id: id}, {$set: {title}}, {new: true})

            else if(!title && !author)
                return HomeModel.findOneAndUpdate({_id: id}, {$set: {text}}, {new: true})

            else if(!text && !title)
                return HomeModel.findOneAndUpdate({_id: id}, {$set: {author}}, {new: true})

            else if(!title)
                return HomeModel.findOneAndUpdate({_id: id}, {$set: {text, author}}, {new: true})

            else if(!text)
                return HomeModel.findOneAndUpdate({_id: id}, {$set: {title,author}}, {new: true})

            else if(!author)
                return HomeModel.findOneAndUpdate({_id: id}, {$set: {title, author}}, {new: true})

            else
                return HomeModel.findOneAndUpdate({_id: id}, {$set: {title, text, author}}, {new: true})

        }catch(err) {
            return err
        }
    }
}

export default new HomeService()