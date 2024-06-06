const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const fileUpload = require('express-fileupload');

const usersRoute = require('./routes/users.routes');
const postsRoute = require('./routes/posts.routes')
 
const app = express();

app.use(cors())
app.use(express())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan('dev'))
app.use(fileUpload())


app.use('/users', usersRoute)
app.use('/post', postsRoute)

app.use((req,res,next)=>{
    res.status(400).json({
        message: `400 route not found`
    })
})

app.use((err,req,res,next)=>{
    res.status(500).json({
        message: `500 Something broken!`
    })
})

module.exports = app;
