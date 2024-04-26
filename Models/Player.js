const client=require('../Client')
const { Sequelize, DataTypes, Model } = require('sequelize');
const {bcrypt,hash} = require('bcrypt');
class Player extends Model{
    async validatePass(formpassword){
        const is_valid=await compare(formpassword,this.password)
        return is_valid
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
            ,unique:{
                args:true,
                msg:"email is already taken"
            }
        },
        password:{
            type:DataTypes.STRING,
            validate:{
                len:6,
                msg:"YOur password must be at leats 6 characters in length"
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
  

  module.exports= Player