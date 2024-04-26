const { Sequelize, DataTypes, Model } = require('sequelize');
const {log}=console;
const {bcrypt,hash} = require('bcrypt');
const { autoInject } = require('neo-async');
const client=require('./Client')
const [Team,Player]=require('./Models/index')
// const { validate } = require('uuid');





// User.hasMany(Note)
// Note.belongsTo(User)
// recreates the tables and deletes the data
  client.sync({force:false})
  .then(
    async()=>{
        const braves = await Team.findByPk(1,{
            include:Player
        })
        const Julie = await Player.findByPk(2,{
            include:Team
        })
        log(Julie.get({plain:true}))
    //    const brave = await Team.create({
    //     name:'Brave',
    //     type:'baseball',
    //     coach:'Brian Sniker'
    //    })
    //    const Julie=await Player.create({
    //     email :'Julie@test.com',
    //     password :"123ABC",
    //     first_name :"Julie",
    //     last_name :"Willson",
    //     age :15
    //    })
    //    log(Julie) 
    //    log(brave)
    }
  )