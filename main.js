const Discord = require("discord.js")
const { CommandValidator, CommandValidationError } = require("./classes/command-validator.js")
const { CurrentMatch } = require("./classes/current-match.js")
const { generateEmbed } = require("./helpers/discord-embed-builder.js")

const client = new Discord.Client()

const botToken = ``
const teamsChannelName = ``

const commandValidator = new CommandValidator(teamsChannelName)
var currentMatch

client.once("ready", () => {
  console.log("Online!")
})

client.on("message", async (message) => {
  try {
    commandValidator.validateMessage(message)
    const args = message.content.split(/ +/)

    const command = args.shift().toLowerCase().substring(1)

    switch (command) {
      case "teems":
        const numberOfTeams = 2
        commandValidator.validateTeemsCommandArgs(args, numberOfTeams)

        const contestantsPerTeam = args.length / numberOfTeams
        const teams = []

        for (let i = 0; i < numberOfTeams; i++) {
          teams.push(
            args.slice(i * contestantsPerTeam, i * contestantsPerTeam + args.length / numberOfTeams)
          )
        }

        const numberOfStages = args.length <= 6 ? 8 : 10
        currentMatch = new CurrentMatch(teams, numberOfStages)

        message.channel.send(generateEmbed(currentMatch.selectedStages, currentMatch.teams))
        break
      case "reroll":
        commandValidator.validateRerollCommandArgs(args, currentMatch)

        const rerolledStageNumber = parseInt(args[0])
        currentMatch.rerollStage(rerolledStageNumber)
        message.channel.send(generateEmbed(currentMatch.selectedStages, currentMatch.teams))
        break
    }
  } catch (err) {
    if (err instanceof CommandValidationError) {
      if (err.echoMessageToChannel) message.channel.send(err.message)
    } else {
      console.log(err.message)
    }
  }
})

client.login(botToken)
