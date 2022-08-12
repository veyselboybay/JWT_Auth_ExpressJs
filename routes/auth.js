const router = require('express').Router();
const User = require('../modals/user_modal');

//Validation
const joi = require('@hapi/joi')

const schema = joi.object({
    name: joi.string().min(6).required(),
    email:joi.string().min(6).required().email(),
    password:joi.string().min(6).required()
})

/**
 * METHOD: POST
 * PURPOSE: REgister a new user to database
 */
router.post('/register',async (req,res) =>{
    const reqBody = req.body;
    //Validate data
    const validation = schema.validate(req.body);
    res.send(validation);
    // const user = new User({
    //     name:reqBody.name,
    //     email:reqBody.email,
    //     password:reqBody.password,
    // });
    // try{
    //     const isOk = await user.save();
    //     return res.status(200).send(isOk);
    // }catch(err){
    //     return res.status(400).send(err);
    // }
});

/**
 * METHOD: POST
 * PURPOSE: lOGIN THE USER
 */
router.post('/login',async (req,res)=>{

});



module.exports = router;