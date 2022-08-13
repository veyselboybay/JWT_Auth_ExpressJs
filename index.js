const express = require('express')
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const mongoose = require('mongoose')
require('dotenv/config')
const verifyUser = require('./verifyToken');

// Create express app
const app = express()

//Middleware to parse data
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Middleware to verify user token

app.use('/api/posts',verifyUser);

// Middleware for routes
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);



// DB connection with mongoDB
mongoose.connect(process.env.DB_CONNECTION,(err)=>{
    if(err){
        return console.log(err);
    }
    console.log('Database connected successfully...');
})  


// Listen server
app.listen(3000,()=>{
    console.log('Server Listening on port:3000...');
})