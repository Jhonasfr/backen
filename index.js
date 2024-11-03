const express = require('express');
const {urlencoded, json} = require('express');
const router = require('./routes/signos.routes.js');
const cors = require('cors');

const app = express();

app.use(urlencoded({extended: true}))
app.use(json())

app.use(cors())
app.use('/v1/signos', router);

const port = process.env.PORT || 9001
app.listen(port, ()=>{
    console.log('listening at port 4000');
})
