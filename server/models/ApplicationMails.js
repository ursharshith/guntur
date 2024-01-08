const mongoose = require("mongoose")

const ApplicationMails = mongoose.Schema({
    email: String,
    fromplace: String,
    toplace: String,
    months: String,
    status: String,
    applicationType: String,
    imgUrl:String,
    startDate:String,
    endDate:String,
})

const ApplicationMailsModel = mongoose.model('application-mails', ApplicationMails)
module.exports = ApplicationMailsModel;