const { where } = require('underscore')
const { getAttributes } = require('../Models/Player.js')
const [Team, Player] = require('../Models/index.js')
const { message } = require('statuses')
const router = require('express').Router()

router.get('/teams', async (req, res) => {
    const teams = await Team.findAll({
        include: {
            model: Player,
            attributes: {
                exclude: ['password']
            }
        }
    })
    // console.log(teams)
    res.send(teams)
})

router.get('/players', async (req, res) => {
    const player = await Player.findAll({
        include: Team
    })
    // console.log(teams)
    res.send(player)
})
router.get('/team/:team_id', async (req, res) => {
    const TeamID = req.params.team_id
    const team = await Team.findOne({
        where: { team_id: TeamID }
    })
    res.send(team)
})

router.delete('/team/:team_id', async (req, res) => {
    const TeamID = req.params.team_id
    const team = await Team.findOne({
        where: { team_id: TeamID }
    })
    if(team){
        await team.destroy()
     return res.json({message:"Team removed"})
    }
    res.status(404).json({message:`Team with that ID not found `})
})

router.get('/player/:player_id', async (req, res) => {
    const PlayerID = req.params.player_id
    const player = await Player.findOne({
        where: { player_id: PlayerID }
    })
    res.send(player)
})

router.post('/player', async (req, res) => {
    const PlayerInfo = req.body
    try {
        const newPlayer = await Player.create({
            email: PlayerInfo.email,
            password: PlayerInfo.password,
            first_name: PlayerInfo.first_name,
            last_name: PlayerInfo.last_name,
            age: PlayerInfo.age
        })
        // console.log(PlayerInfo.password)
        res.send(PlayerInfo)

    } catch (err) {
        res.send()
    }
})

router.put('/player/:player_id', async (req, res) => {
    const UpdatePlayerInfo = req.body
    const PlayerID = req.params.player_id;
    try {
        const oldPlayer = await Player.findOne({
           where:{player_id: PlayerID}
        })
        oldPlayer.first_name = UpdatePlayerInfo.first_name || oldPlayer.first_name;
        oldPlayer.last_name = UpdatePlayerInfo.last_name || oldPlayer.last_name;
        await oldPlayer.save()


        // console.log(PlayerInfo.password)
        res.send(UpdatePlayerInfo)

    } catch (err) {
        res.send()
    }
})

router.post('/player/ToTeam/:PlayerID', async (req, res) => {
    const TeamInfo = req.body
//    {
//     Team_name:"Falcons"
//    }
    
    try {
        const Player = await Player.findByPk(req.params.PlayerID)
        const Team = await Player.findOne({        })
        Team.addPlayer(Player)

    } catch (err) {
        res.send()
    }
})



module.exports = router