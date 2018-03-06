import express from "express"
import * as NewsletterController from "../Controllers/NewsletterContoller"

const Router = express.Router()

Router.get('/', NewsletterController.index)

Router.post('/subscribe', NewsletterController.subscribe)
Router.post('/sendMail', NewsletterController.sendMail)
Router.post('/deleteSub', NewsletterController.deleteSub)
export default Router