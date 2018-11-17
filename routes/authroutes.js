const express = require('express');
const app = express();
const router = express.Router();

const bodyParser = require('body-parser');

router.get('/',(req,res)=>{
    res.send('this is the auth route')
});

module.exports = router;