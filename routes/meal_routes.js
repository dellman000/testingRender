const mealRouter = require('express').Router()
const path=require('path')


mealRouter.get('/test',(req,res)=>{
    res.send("works")
})

module.exports = mealRouter;