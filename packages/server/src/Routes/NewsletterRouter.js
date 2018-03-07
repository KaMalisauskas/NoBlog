import express from "express"
import * as NewsletterController from "../Controllers/NewsletterContoller"

const Router = express.Router()

Router.get('/newsletter/', NewsletterController.index)

Router.post('/newsletter/subscribe', NewsletterController.subscribe)
Router.post('/newsletter/sendMail', NewsletterController.sendMail)
Router.post('/newsletter/deleteSub', NewsletterController.deleteSub)
export default Router