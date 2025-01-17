const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const passport = require('./config/Passport')
const authRoutes = require('./routes/auth')
const invoiceRoutes = require('./routes/Invoice')
const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())
app.use(passport.initialize());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err))

app.use('/auth', authRoutes);
app.use('/invoice', invoiceRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})