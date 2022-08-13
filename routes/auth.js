const router = require('express').Router();
const User = require('../modals/user_modal');
const { registerValidation, loginValidation } = require('../validation');

//Validation



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
        return res.status(400).send('Email already exists!');
    }

    //Create a new user   
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    });
    try{
        const isOk = await user.save();
        return res.status(200).send(isOk);
    }catch(err){
        return res.status(400).send(err);
    }
});

/**
 * METHOD: POST
 * PURPOSE: lOGIN THE USER
 */
router.post('/login',async (req,res)=>{

});



module.exports = router;