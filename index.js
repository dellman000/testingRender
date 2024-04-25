const { Sequelize, DataTypes, Model } = require('sequelize');
const {log}=console;
const {bcrypt,hash} = require('bcrypt');
// const { validate } = require('uuid');
const client = new Sequelize(
    'sequelize_practice_db',
     'postgres',
      'pass', 
{
    host: 'localhost',
    dialect: 'postgres'
  });

  class Note extends Model{}
  Note.init(
    {
        text:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        sequelize:client
    }
  )



  class User extends Model{
    async validatePass(formpassword){
        const is_valid=await compare(formpassword,this.password)
    }

  }

  User.init(
    {
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
        }
    },
    {
        sequelize:client,
        hooks:{
           async beforeCreate(user){
                user.password=await hash(user.password,10)
            }
        }
    }
  )
User.hasMany(Note)
Note.belongsTo(User)
// recreates the tables and deletes the data
  client.sync({force:false})
  .then(
    async()=>{
        //create a user 
        const newUser= await User.create({
            email:"kenren@udel.edu",
            password:"123456789abc"
        })
        log(newUser)
        // how to link to instancts of a table
        // const findKen= await User.findByPk(1)

        // const kenNotes= await findKen.createNote({
        //     text:'Note for Ken'
        // })

        //find a user assoicated with this email
        // const user = await User.findOne({
        //     where:{
        //         email:'kenren@udel.edu'
        //     },
        //     include:Note
        // })

        // await Note.destroy({
        //     where:{},
        //     // truncate:true
        // })

        // const note = await Note.findByPk(1,{include:User})

        // //find all
        // const users = await Note.findAll({
        //     attributes:['text'],
        //     where:{
        //         id:1
        //     }
        // })
        // find one
        // const user = await Note.findOne({
        //     attributes:['text'],
        //     where:{
        //         id:1
        //     }
        // })
        // //find by Primary key 
        // const find_user_by_PrimaryKey = await Note.findByPk(3)
        // // const note = await Note.create({
        // //     text:"Text for note One"
        // // })

        // const note = await Note.update(
        //     {
        //         text:`New text for note 1`
        //     },
        //     {
        //         where:{
        //             id:1
        //         },
        //         returning:true

        //     }
        // )
        // const noteRemove = await Note.destroy(
        //     {
        //         where:{
        //             id:1
        //         }

        //     }
        // )
        
        
    }
  )