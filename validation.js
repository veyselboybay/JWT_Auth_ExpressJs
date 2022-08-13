const joi = require('@hapi/joi')

//REgister validation
const registerValidation = (body)=>{
    const schema = joi.object({
        name: joi.string().min(6).required(),
        email:joi.string().min(6).required().email(),
        password:joi.string().min(6).required()
    });

     //Validate data
     return schema.validate(body);
}

//Login VAlidation
const loginValidation = (body)=>{
    const schema = joi.object({
        email:joi.string().min(6).required().email(),
        password:joi.string().min(6).required()
    });

     //Validate data
     return schema.validate(body);
}

module.exports = { registerValidation, loginValidation }