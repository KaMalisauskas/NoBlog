import NewsletterService from "../Modules/Newsletter/NewsletterService"
import SubsModel from "../Modules/Newsletter/SubsModel"
import Helper from "./Helper"

export const index = (req, res) => Helper.successHandler("Welcome to Newsletters Route of NoBlog API", res)

/*
    @TODO sanitize email
 */
export const subscribe = async (req, res) => {
    try{
        await NewsletterService.subscribe(req.body)

        await NewsletterService.subsFirstEmail(req.body)

        Helper.successHandler("Subscription was successful", res)

    }catch(err) {
        Helper.errorHandler(String(err), 400, res)
    }
}

export const sendMail = async (req, res) => {
    try{
        if(!req.body.subject && !req.body.subject) throw new Error("Nothing to send")

        const Subscribed = await SubsModel.find()

        await NewsletterService.SendMail(req.body, Subscribed)

        Helper.successHandler("Newsletter successfully sent", res)

    } catch(err) {
        Helper.errorHandler(String(err), 400, res)
    }
}

export const deleteSub = async (req, res) => {
    const email = req.body.email
    try{
        if(!email) throw new Error("No email submited")

        const Sub = await SubsModel.findOneAndRemove({email})

        if(!Sub) throw new Error("No subscribed by given email founded")

        Helper.successHandler("Successfully Unsubscribed", res)
    }catch(error) {
        Helper.errorHandler(String(err), 400, res)
    }
}
