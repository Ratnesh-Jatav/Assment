
const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema(
{
    name: {type: String, required : true},
    disease : {type : String, required : true},
    wardNumber : {type : Number, required : true},
    admittedDate : {type: Date, required : true}
}
)

module.exports = mongoose.model('Patient', patientSchema)