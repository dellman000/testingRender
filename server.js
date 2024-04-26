const {log}=console;
require('dotenv').config()
const client=require('./Client')
const [Team,Player]=require('./Models/index')
const express = require('express');
const app =express();
const PORT = process.env.PORT||3333
//Load json
app.use(express.json())
//load routes
const api_routes=require('./routes/api_routes')
app.use('/api',api_routes)




client.sync({force:false})
.then(
  async()=>{
    app.listen(PORT,()=>{console.log(`Server Started on localhost:`,PORT)})
  }
)