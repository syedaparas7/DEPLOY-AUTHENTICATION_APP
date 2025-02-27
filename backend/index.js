const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter= require ('./Routes/AuthRouter');
const ProductsRouter= require ('./Routes/ProductsRouter')

// connect to db
require('dotenv').config();
require('./Models/DB')

// routes
const PORT = process.env.PORT || 8080


app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products',ProductsRouter);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});