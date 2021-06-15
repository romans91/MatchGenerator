const commandPrefix = "!"
const playerCountLimit = 36

class CommandValidationError extends Error {
  constructor(message, echoMessageToChannel) {
    super(message); 
    this.name = "CommandValidationError";
    this.echoMessageToChannel = echoMessageToChannel
  }
}

class CommandValidator {
  constructor(teamsChannelName) {
    this.teamsChannelName = teamsChannelName
  }

  validateMessage = (message) => {
    if (message.author.bot) {
      throw new CommandValidationError(`Command author cannot be a bot.`, false)
    }

    if (message.channel.name != this.teamsChannelName) {
      throw new CommandValidationError(`Command must be posted in the correct channel "#${this.teamsChannelName}"`, false)
    }

    if (!message.content.startsWith(commandPrefix)) {
      throw new CommandValidationError(
        `The available commands are "${commandPrefix}teems [player 1 name] [player 2 name] ..." and "${commandPrefix}reroll [stage number]."`, true
      )
    }    
  }

  validateTeemsCommandArgs = (args, numberOfTeams) => {
    if (args.length == 0)
      throw new CommandValidationError(
        `Type in player names separated by a space after the "${commandPrefix}teems" command.`, true
      )

    if (args.length > playerCountLimit)
      throw new CommandValidationError(`Cannot create a match with more than ${playerCountLimit} players`, true)

    if (!Number.isInteger(args.length / numberOfTeams)) {
      throw new CommandValidationError(`Cannot split ${args.length} players into ${numberOfTeams} teams.`, true)
    }
  }

  validateRerollCommandArgs = (args, currentMatch) => {
    if (currentMatch == null) {
      throw new CommandValidationError(
        `In order to re-roll a stage, you must first begin a match using the "${commandPrefix}teems" command.`, true
      )
    }

    if (!/^[-+]?(\d+|Infinity)$/.test(args[0])) {
      throw new CommandValidationError(`Select a stage to re-roll using a number from 1 to ${currentMatch.selectedStages.length}.`, true)
    }

    const rerolledStageNumber = parseInt(args[0])

    if (rerolledStageNumber > currentMatch.selectedStages.length || rerolledStageNumber < 1) {
      throw new CommandValidationError(`Select a stage to re-roll using a number from 1 to ${currentMatch.selectedStages.length}.`, true)
    }
  }
}

module.exports = {
  CommandValidator, CommandValidationError
}
