const router = require('express').Router();

/**
 * METHOD: POST
 * PURPOSE: REgister a new user to database
 */
router.post('/register',async (req,res) =>{
    res.send(req.body)
});

/**
 * METHOD: POST
 * PURPOSE: lOGIN THE USER
 */
router.post('/login',async (req,res)=>{

});



module.exports = router;