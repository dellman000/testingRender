const express = require('express');
const app = express()
const PORT = process.env.PORT|| 3333;
const { engine } = require( 'express-handlebars')

const routes=require('./routes/index')
const client = require('./db/client')

app.use(express.static('public'))

// Alow url encoded data
app.use(express.urlencoded({extended:false}))
//alow json data
app.use(express.json())

app.engine('handlebars',engine())
app.set('view engine','handlebars')
app.set('views','./views')

app.use('/',routes)

client.connect()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is active. localhost:${PORT}`)
        })
        
})

