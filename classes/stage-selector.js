const { getStagesAndRatings } = require("../helpers/stage-popularity-rating-fetcher.js")

class StageSelector {
  constructor(numberOfStages) {
    this.stagePopularityScores = getStagesAndRatings()

    if (numberOfStages > this.stagePopularityScores.length)
      throw new Error(
        `The number of stages proposed for this tournament (${numberOfStages}) exceeds the number of available stages (${this.stagePopularityScores.length})`
      )

    this.selectedStages = []

    for (let i = 0; i < numberOfStages; i++) {
      this.selectedStages.push(`${this.getRandomUniqueStage()}`)
    }
  }

  getRandomUniqueStage() {
    let random = Math.random() * this.aggregateStagePopularityScores()
    let eligibleStages = this.stagePopularityScores.filter(
      (t) => !this.selectedStages.includes(t.name)
    )

    let stageIndex = -1
    while (random > 0) {
      stageIndex++
      random -= eligibleStages[stageIndex].score
    }

    return eligibleStages[stageIndex].name
  }

  rerollStage(stageNumber) {
    this.selectedStages[stageNumber - 1] = this.getRandomUniqueStage()
  }

  aggregateStagePopularityScores() {
    let total = 0
    this.stagePopularityScores.map((t) => {
      if (!this.selectedStages.includes(t.name)) total += t.score
    })

    return total
  }
}

module.exports = { StageSelector }
