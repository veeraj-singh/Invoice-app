const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('./config/Passport')
const authRoutes = require('./routes/auth')
const invoiceRoutes = require('./routes/Invoice')
const zapierRoutes = require('./routes/zapier');
const emailTemplateRoutes = require('./routes/templates')
const app = express()

const dotenv = require('dotenv')
dotenv.config()

app.use(cors())
app.use(express.json())
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err))

app.use('/api/auth', authRoutes)
app.use('/api/invoice', invoiceRoutes)
app.use('/api/zapier', zapierRoutes)
app.use('/api/email-templates', emailTemplateRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
