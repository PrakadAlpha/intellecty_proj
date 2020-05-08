const express = require('express');
require('colors');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDb = require('./config/db');
const sanitize = require('express-mongo-sanitize')
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const auth = require('./routes/auth');
const transactions = require('./routes/transactions');
const products = require('./routes/products');
const customers = require('./routes/customers');

const app = express();

dotenv.config({path:'./config/config.env'});

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

connectDb();

app.use(sanitize());

app.use(helmet());

app.use(xss());

app.use(hpp());

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use(cors());

app.use('/api/auth', auth);
app.use('/api/customers', customers);
app.use('/api/products', products);
app.use('/api/transactions', transactions);


app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running in "${process.env.NODE_ENV}" mode on port "${PORT}"`.yellow.bold));
