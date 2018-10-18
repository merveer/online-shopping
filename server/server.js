const express = require('express') // framwework for http routes
const morgan = require('morgan') // simplifies the login req to app
const bodyParser = require('body-parser') // data reader - from fe to nodejs(login data)
const mongoose = require('mongoose') // communication from nodejs to mongodb
const cors = require('cors') // provide secure communication btw fe & be

const config = require('./config')

const app = express()

mongoose.connect(config.database, (err) => { // func to communicate to cloud mongodb
  if (err) {
    console.log(err)
  } else {
    console.log('connected to mongodb')
  }
})

app.use(bodyParser.json()) // read data in json format
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(morgan('dev')) //log all reqs to terminal
app.use(cors())

const userRoutes = require('./routes/account');
const mainRoutes = require('./routes/main');
const sellerRoutes = require('./routes/seller');
const productSearchRoutes = require('./routes/product-search');

app.use('/api', mainRoutes);
app.use('/api/accounts', userRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/search', productSearchRoutes);

app.listen(config.port, err => {
  console.log('Running')
})
