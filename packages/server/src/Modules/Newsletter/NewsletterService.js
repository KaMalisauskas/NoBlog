import SubsModel from "./SubsModel"
import Config from "../../config.json"
import NodeMailer from "nodemailer"

class NewsletterService{

    subscribe({email}) {
        if(!email) throw new Error("Email hasn't been received")
        try{
            return SubsModel.create({email})
        }catch(err) {
            return err
        }
    }
    subsFirstEmail({email}) {
        let confEmail = Config.newsletter.email
        let password = Config.newsletter.password

        const transporter = NodeMailer.createTransport({
            service: "Gmail",
            secure: false,
            port: 25,
            auth: {
                user: confEmail,
                pass: password
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        const HelperOptions = {
            from:`"Karolis - Blogger" <${confEmail}`,
            to: email,
            subject: "Congrats on subscribing to Karolis newsletter",
            text: "You have successfully subscribed to Karolis blog newsletter!!"
        }
        try{
            return transporter.sendMail(HelperOptions)
        } catch (error) {
            return error
        }


    }

    SendMail({subject, text}, AllEmails) {
        if(!subject && !text) throw new Error("Nothing to send")

        const confEmail = Config.newsletter.email
        const password = Config.newsletter.password

        let allEmailString = ""
        AllEmails.map(obj => allEmailString += ` ${obj.email},`)

        allEmailString.trim()

        const transporter = NodeMailer.createTransport({
            service: "Gmail",
            secure: false,
            port: 25,
            auth: {
                user: confEmail,
                pass: password
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        const HelperOptions = {
            from:`"Karolis - Blogger" <${confEmail}`,
            to: allEmailString,
            subject: subject,
            text: text
        }

        try{
            return transporter.sendMail(HelperOptions)
        } catch(error) {
            return error
        }

    }
    test() {
        return new Promise((resolve, reject) => {
            reject("fail")
        })
    }
}

export default new NewsletterService()