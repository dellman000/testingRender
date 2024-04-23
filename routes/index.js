const router=require('express').Router()

const meal_routes= require('./meal_routes.js')
const user_routes= require('./user_routes.js')
const view_routes= require('./view_routes.js')
router.use('/',[user_routes,meal_routes,view_routes])

module.exports=router;