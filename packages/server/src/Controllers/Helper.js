
class Helper {
    errorHandler(err, status, res) {
        return res.status(status).json({
            success: false,
            error: String(err)
        })
    }
    successHandler(msg, res) {
        return res.status(200).json({
            success: true,
            data: msg
        })
    }
}

export default new Helper()