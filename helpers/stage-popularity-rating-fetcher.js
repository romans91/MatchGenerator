const lineByLine = require("n-readlines")

const getStagesAndRatings = () => {
  const liner = new lineByLine("stages.csv")
  let stages = []

  let line
  while ((line = liner.next())) {
    let stagePopularityStats = line.toString().trim().split(",")

    stages.push({
      name: stagePopularityStats[0],
      score: parseFloat(stagePopularityStats[1]),
    })
  }

  return stages
}

module.exports = {
  getStagesAndRatings,
}
