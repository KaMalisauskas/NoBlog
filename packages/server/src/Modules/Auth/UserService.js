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

            try {
                return UserModel.findOneAndUpdate({username}, {$set: {username: newUsername}}, {new: true})
            } catch (err) {
                return err
            }

        else if(!newUsername && !newPassword)

            try{
                return UserModel.findOneAndUpdate({username}, {$set: {email: newEmail}}, {new: true})
            } catch (err) {
                return err
            }

        else if(!newUsername && !newEmail)
            try{
                const password = hashSync(password)
                return UserModel.findOneAndUpdate({username}, {$set: {password}}, {new: true})
            } catch (err) {
                return err
            }

        else if(!newEmail)

            try{
                const password = hashSync(password)
                return UserModel.findOneAndUpdate({username}, {$set: {username: newUsername, password}}, {new: true})
            } catch (err) {
                return err
            }

        else if(!newUsername)

            try{
                const password = hashSync(password)
                return UserModel.findOneAndUpdate({username}, {$set: {email: newEmail, password}}, {new: true})
            } catch(err) {
                return err
            }

        else if(!newPassword)

            try{
                return UserModel.findOneAndUpdate({username}, {$set: {email: newEmail, username: newUsername}}, {new: true})
            } catch(err) {
                return err
            }

        else

            try{
                const password = hashSync(password)
                return UserModel.findOneAndUpdate({username}, {$set: {email: newEmail, password, username: newUsername}}, {new: true})
            } catch(err) {
                return err
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