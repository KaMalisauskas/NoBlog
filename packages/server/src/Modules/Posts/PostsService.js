import PostModel from "./PostModel"

class PostsService {
    /*
        @ToDo Add validation and sanitise
     */
    add({title, text, authorId, categoryId}) {
        if(!title && !text && !authorId && !categoryId) throw new Error("No fields submitted")
        try{
            return PostModel.create({title, text, authorId, categoryId})
        } catch(err) {
            return err
        }
    }

    async addRating({id, vote}) {
        if(!id) throw new Error("No Id submitted")
        if(!vote && vote < 0) throw new Error("No Vote Submitted")

        try {
            const GetRating = await PostModel.findOne({_id: id}).select("rating")
            let rating = GetRating.rating + parseInt(vote)
            return PostModel.findOneAndUpdate({_id: id}, {$set: {rating}}, {new: true})
        } catch(err) {
            return err
        }
    }
    //not working as it should
    get() {
        try{
           return PostModel.aggregate(
               [
                   {
                       "$lookup": {
                           "from": "users",
                           "localField": "authorId",
                           "foreignField": "_id",
                           "as": "author"
                       }
                   }
               ]
           );
        } catch(err) {
            return err
        }
    }

    getByCategory({category}) {
        try{
            return PostModel.find({category})
        } catch(err) {
            return err
        }
    }

    update({id, title, text}) {
        if(!id) throw new Error("No post id submitted")
        if(!title && !text) throw new Error('No field to update submitted')

        try{
            console.log(text)
            if(!title)
                return PostModel.findOneAndUpdate({_id:id}, {$set: {text}}, {new:true})
            else if(!text)
                return PostModel.findOneAndUpdate({_id:id}, {$set: {title}}, {new:true})
            else
                return PostModel.findOneAndUpdate({_id:id}, {$set: {title,text}}, {new:true})

        } catch(err) {
            return err
        }
    }

    remove({id}) {
        if(!id) throw new Error("No post id submitted")

        try{
            return PostModel.findOneAndRemove({_id:id})
        } catch(err) {
            return err
        }
    }
}

export default new PostsService()