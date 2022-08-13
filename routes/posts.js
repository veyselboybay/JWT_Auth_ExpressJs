const router = require('express').Router()

router.get('/',(req,res) =>{
    return res.json(
        {
            posts:{
            title:'first post',
            description:'secret secret'
            }
        }
    );
})



module.exports = router;