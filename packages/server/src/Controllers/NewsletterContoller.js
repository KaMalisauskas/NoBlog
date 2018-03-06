import NewsletterService from "../Modules/Newsletter/NewsletterService"
import SubsModel from "../Modules/Newsletter/SubsModel"


export const index = (req, res) => res.status(200).json({
    success: true,
    data: "Welcome to Newsletters Route of NoBlog API"
})

/*
    @TODO sanitize email
 */
export const subscribe = async (req, res) => {
    try{
        await NewsletterService.subscribe(req.body)

        await NewsletterService.subsFirstEmail(req.body)

        res.status(200).json({
            success: true,
            data: "Subscription was successful"
        })

    }catch(err) {
        res.status(400).json({
            success: false,
            error: String(err)
        })
    }
}

export const sendMail = async (req, res) => {
    try{
        if(!req.body.subject && !req.body.subject) throw new Error("Nothing to send")
        const Subscribed = await SubsModel.find()
        await NewsletterService.SendMail(req.body, Subscribed)
        res.status(200).json({
            success: true,
            data: "Newsletter successfully sent"
        })
    } catch(err) {
        res.status(200).json({
            success: false,
            error: String(err)
        })
    }
}

export const deleteSub = async (req, res) => {
    const email = req.body.email
    try{
        if(!email) throw new Error("No email submited")

        const Sub = await SubsModel.findOneAndRemove({email})

        if(!Sub) throw new Error("No subscribed by given email founded")

        res.status(200).json({
            success: true,
            data: "Successfully Unsubscribed"
        })
    }catch(error) {
        res.status(400).json({
            success: false,
            error: String(error)
        })
    }
}
