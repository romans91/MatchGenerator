# MatchGenerator

MatchGenerator is a Discord bot that alllows any member of a server to generate a teams-based match with one command. 
Each match consists of several games, each of which takes place on a different arena.
This application decides which arenas will be used for each track in a weighted random method.
Each arena's popularity, obtained by adding up its user ratings obtained from a popularity survey, corresponds to its chances of being selected.

This bot posts a link to a [Lorenzi's Game Boards](https://gb.hlorenzi.com/) scoreboard generated for the current tournament.

## Setup

### Ensure that Node.js is installed on your machine

If you do not have Node.js installed on your machine, download and install it from the following link:

[Download Node.js](https://nodejs.org/en/download/)

Verify that you have Node.js installed on your machine by running the following command:

`node -v`

### Creating a Discord bot application

Create a new Discord application by navigating the following link, and then pressing the "New Application" button: 

[Discord developer portal](https://discord.com/developers/applications)

Convert the application into a bot user via "Settings" -> "Bot".

Find the bot's client secret under "Settings" -> "OAuth2" -> "Client Information", and paste it into the value of the "botToken" variable at the top of "Main.js".

Set the "teamsChannelName" property in "Main.js" to the name of the channel where this bot will accept commands from.

### Setting up permissions and inviting the bot to your server

Open the following link:

[Discord Permissions Calculator](https://discordapi.com/permissions.html)

Select any number of permissions that you would like to grant your bot, once it joins any of your servers.
At the very least, the bot will need the "Read Messages", "Send Messages", "Embed Links" and "Attach Files" in order to read commands and post embeds into channels.

Find the bot's client ID under "General Information" -> "Application ID", and paste it into the "Client ID" field of the Permissions Calculator, which is under "OAuth URL Generator".

Navigate to the link at the bottom of the Permissions Calculator, and then invite the application's bot user to any of your servers.

### Setting up a data source for stage popularity scores

Stage names and respective popularity scores are stored in a file named "stages.csv" in the base directory. Each line of this file is in the following format:

`[stage name (string)],[popularity score (float)]`

An example of contents of this file is below:

```
Stage 1, 100
Stage 2, 50
Stage 3, 10
...
```

The aggregate score for these stages is 160. "Stage 1" has a 5/8 (100/160) chance of being selected by the bot, and "Stage 3" has a 1/16 (10/160) chance of being selected.

This command will not select the same stage twice.

The number of games in the match must also not exceed the number of stages that this file contains. 
For matches with 6 players or less, the number of stages is 8. 
For matches with more than 6 players, the number of stages is 10.

There is also an example "stages.csv" file already in the directory.

## Commands

The following commands must be called from a channel with the same name as the value of the "teamsChannelName" property in "Main.js".

### !teems

This command has the following format:

`!teems [player 1 name] [player 2 name] [player 3 name] [player 4 name] ...`

The !teems command accepts a whitespace-separated list of arguments as a list of player names, and creates a new match after splitting the players into teams.

This command will post an embed into the designated teams channel which will contain a list of stages over which the match will take place, along with a hyperlink to this match's Lorenzi scoreboard, which will be filled in manually as the games proceed.

The number of player names provided must be divisible by the number of teams.
Currently, the number of teams is always two.

### !reroll

This command has the following format:

`!reroll [stage index]`

While a match created by the "!teems" command exists, this command can be used to reject a stage from the list of stages of the current match, and randomly replace it with another unused stage.