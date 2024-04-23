const {Client,Pool} = require('pg')
const {log}=console
const client = new Pool({
    host:'localhost',
    user:'postgres',
    password:'pass',
    database:'meal_planner_db'
})

module.exports=client;