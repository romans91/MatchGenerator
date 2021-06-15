const Please = require("pleasejs")

const getUrl = (numberOfStages, teams) => {
  const urlBase = `https://gb.hlorenzi.com/table?data=`
  let urlData = `#title [TITLE]`

  const colorScheme = getScoreboardColorScheme()

  for (let i = 0; i < teams.length; i++) {
    urlData += `\n[TEAM ${String.fromCharCode(65 + i)}] - [FULL NAME] ${colorScheme[i]}`

    for (let j = 0; j < teams[i].length; j++)
      urlData += `\n${teams[i][j]} ${`0|`.repeat(numberOfStages - 1)}0`
  }

  return urlBase + encodeURIComponent(urlData)
}

const getScoreboardColorScheme = () => {
  const colorScheme = Please.make_scheme(
    {
      h: Math.random() * 360,
      s: 0.5,
      v: 1.0,
    },
    {
      scheme_type: "analogous",
      format: "hex",
    }
  )

  for (let i = 0; i < colorScheme.length; i++) {
    let rand = Math.floor(Math.random() * 6)

    let temp = colorScheme[i]
    colorScheme[i] = colorScheme[rand]
    colorScheme[rand] = temp
  }

  return colorScheme
}

module.exports = {
  getUrl,
}
