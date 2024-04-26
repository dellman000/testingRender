
const { message } = require('statuses');
const client=require('../Client')
const { Sequelize, DataTypes, Model } = require('sequelize');
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
          allowNull:{args:false,
                        msg: "You must provide a name for the team"}
      },coach:{
          type:DataTypes.STRING
      }
  },
  {
      sequelize:client,
      modelName:'team'
  }
)

module.exports= Team;