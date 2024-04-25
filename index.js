const { Sequelize, DataTypes, Model } = require('sequelize');
const {log}=console;
const {bcrypt,hash} = require('bcrypt');
const { autoInject } = require('neo-async');
// const { validate } = require('uuid');
const client = new Sequelize(
    'team_db',
     'postgres',
      'pass', 
{
    host: 'localhost',
    dialect: 'postgres'
  });

  class Team extends Model{}
  Team.init(
    {
        team_id:{
            type:DataTypes.INTEGER,
            allowNull :false,
            primaryKey :true,
            autoIncrement :true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },coach:{
            type:DataTypes.STRING
        }
    },
    {
        sequelize:client,
        modelName:'team'
    }
  )



  class Player extends Model{
    async validatePass(formpassword){
        const is_valid=await compare(formpassword,this.password)
    }

  }

  Player.init(
    {
        player_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isEmail:true
            }
        },
        password:{
            type:DataTypes.STRING,
            validate:{
                len:6
            },
            allowNull:false
        },
        first_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        last_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        age:{
            type:DataTypes.STRING,
            allowNull:false
        }

    },
    {
        sequelize:client,
        hooks:{
           async beforeCreate(user){
                user.password=await hash(user.password,10)
            }
        },
        modelName:'player'
    }
  )

Team.belongsToMany(Player,{through:'team_player'})
Player.belongsToMany(Team,{through:'team_player'})

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