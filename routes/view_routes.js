const viewRouters = require('express').Router()
const path = require('path')
const {log}=console
// show home page
viewRouters.get('/',(req,res)=>{
    // res.send("view")
    log('the view route')
    res.render("landing",{
        username:'JD',
        something:['apple','orange'],
        notes:[
            {
                'title':'Notes One',
                'text':'text for note one'
            },
            {
                'title':'Notes two',
                'text':'text for note two'
            },
            {
                'title':'Notes three',
                'text':'text for note three'
            }
        ]
    })
})


viewRouters.get('/create',(req,res)=>{
    // res.send("view")
    res.render("meal_form",{
        title:'Add a meal'
    })
})

viewRouters.get('/register',(req,res)=>{
    // res.send("view")
    res.render("register",{
        title:'Register User'
    })
})
module.exports = viewRouters;