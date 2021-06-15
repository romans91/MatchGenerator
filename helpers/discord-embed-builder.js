const Discord = require("discord.js")
const { getUrl } = require("./scoreboard-url-generator.js")

const generateEmbed = (stages, teams) => {
  var teamsMessage = new Discord.MessageEmbed()
    .setURL(getUrl(stages.length, teams))
    .setDescription(
      stages.map((t) => `#${String(stages.indexOf(t) + 1).padEnd(8, "\u00a0")}${t}`).join("\n")
    )
    .setTitle(
      `\t${teams.map(team => team.join(", ")).join("\n\t--- VS ---\n")}`
    )

  return teamsMessage
}

module.exports = {
  generateEmbed,
}
