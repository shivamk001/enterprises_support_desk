const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000
const cors = require('cors')
//console.log('Server.... on PORT:',PORT)
const app = express()

//connect to DB
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
//ROUTES
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk API' })
})
app.use('/api/tickets', require('./routes/ticketRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


app.use(function (req, response, next) {
  //console.log('req:', req.content - type)
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
})


app.use(errorHandler)
app.listen(PORT, () => console.log(`Server started on POST ${PORT}`))
