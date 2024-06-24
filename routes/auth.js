const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    obj = {
        name: 'thios',
        email: 'email@email.com'
    }
    res.json(obj)
} )

module.exports = router