const express = require('express')
const app = express()
const port = 3000
const Doctor = require('./models/Doctor')
const Patient = require('./models/Patient')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const uri = process.env.MONGO_URI
mongoose.connect(uri).then(
    console.log("Mongoose Connected")
)
app.use(cors())
app.use(express.json())

app.get('/patients', async (req, res) => {
    const patients = await Patient.find()
    res.status(200).json(patients)
})


app.post('patients', async (req, res) => {
    const { name, disease, wardNumber, admittedDate } = req.body

    if (!name || !disease || !wardNumber || !admittedDate) {
        res.status(500).json({
            message: "Please fill all the Details"
        })
    }

    const newPatient = Patient.create({ name, disease, wardNumber, admittedDate })
    await newPatient.save()

    res.status(200).json({
        message: "Patient added Success!"
    })
})

app.put('/patient/:id', async (req, res) => {
    const id = req.params
    const updatedData = req.body
    await Patient.findByIdAndUpdate(id, updatedData)
    res.status(200).json({
        message: "Data Updated Success"
    })

})

app.delete('/patient/:id', async (req, res) => {
    const id = req.params
    await Patient.findByIdAndDelete(id)

        res.status(200).json({
            message : "User Deleted Success"
})
})

app.post('/singin', (req, res) => {
    const { email, password } = req.body()
    if (!email || !password) {
        res.status(500).json({
            message: "Please Enter Both Fields"
        })
    }
})

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(500).json({
            message: "Please fill all the Details"
        })
    }

})

app.listen(port, ()=>{
    console.log("Server is Running")
})