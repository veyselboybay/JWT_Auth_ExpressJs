const router = require('express').Router();
const User = require('../modals/user_modal');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');


/**
 * METHOD: POST
 * PURPOSE: REgister a new user to database
 */
router.post('/register',async (req,res) =>{
    //Validate the data
    const { error }= registerValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    //Check if the user already exists
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist){
        return res.status(400).send('User already exists!');
    }
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    //Create a new user   
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
    });
    try{
        const savedUser = await user.save();
        return res.status(200).send({user: savedUser._id});
    }catch(err){
        return res.status(400).send(err);
    }
});

/**
 * METHOD: POST
 * PURPOSE: lOGIN THE USER
 */
router.post('/login',async (req,res)=>{
    // Validate the data
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check if user already exists
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email does not exists');

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    //create a jwt token
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    return res.header('auth-token', token).send(token);
    //res.send('Logged In');
});



module.exports = router;