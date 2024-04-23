const userRouters = require('express').Router()
const path=require('path')
const client = require('../db/client')
const {log}=console
userRouters.post('/auth/register',async(req,res)=>{
    try{
        const data = req.body
        // Create a user in the database
        await client.query('INSERT INTO users(username, password) VALUES ($1, $2)',
        [data.username,data.password])
        res.render("landing")
    }catch(err){
        res.redirect("/register")
        log(err)
    }
})

module.exports=userRouters;