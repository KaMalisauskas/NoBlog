import UserModel from "./UserModel"
import {authLocal, authJwt} from "./passport"
import {hashSync} from "bcrypt-nodejs"

class UserService {
    /*
        @TODO user validation
     */
    addUser({username, password, email}) {
        if(!username || !password || !email) throw new Error("Not all required fields are sent")
        try{
            return UserModel.create({username, password, email})
        } catch(err) {
            return err
        }
    }

    updateUser({username, newUsername, newPassword, newEmail}) {
        //validating body
        if(!username) throw new Error("User is not defined")
        if(!newUsername && !newPassword && !newEmail) throw new Error("Nothing to update")

        //Checking which field to update
        if(!newPassword && !newEmail)

            return UserModel.findOneAndUpdate({username}, {$set: {username: newUsername}}, {new: true})

        else if(!newUsername && !newPassword)

            return UserModel.findOneAndUpdate({username}, {$set: {email: newEmail}}, {new: true})

        else if(!newUsername && !newEmail) {

            const password = hashSync(password)
            return UserModel.findOneAndUpdate({username}, {$set: {password}}, {new: true})
        }

        else if(!newEmail) {

            const password = hashSync(password)
            return UserModel.findOneAndUpdate({username}, {$set: {username: newUsername, password}}, {new: true})
        }

        else if(!newUsername) {

            const password = hashSync(password)
            return UserModel.findOneAndUpdate({username}, {$set: {email: newEmail, password}}, {new: true})
        }

        else if(!newPassword)

            return UserModel.findOneAndUpdate({username}, {$set: {email: newEmail, username: newUsername}}, {new: true})

        else {
            const password = hashSync(password)
            return UserModel.findOneAndUpdate({username}, {$set: {email: newEmail, password, username: newUsername}}, {new: true})

        }
    }

    loggingMiddleware(req, res, next) {
        return authLocal(req, res, next)
    }

    authMiddleware(req, res, next) {
        return authJwt(req, res, next)
    }

    isAdmin(user) {
        return user.admin
    }
}

export default new UserService()