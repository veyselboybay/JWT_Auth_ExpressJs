const { urlencoded } = require('express');
const express = require('express')
const authRoute = require('./routes/auth');


// Create express app
const app = express()

//Middleware to parse data
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Middleware for routes
app.use('/api/user',authRoute);



// Listen server
app.listen(3000,()=>{
    console.log('Server Listening on port:3000...');
})