const { StageSelector } = require("./stage-selector.js")

class CurrentMatch {
  constructor(teams, numberOfStages) {
    this.teams = teams
    this.stageSelector = new StageSelector(numberOfStages)
    this.selectedStages = this.stageSelector.selectedStages
  }

  rerollStage(stageNumber) {
    this.stageSelector.rerollStage(stageNumber)
  }
}

module.exports = { CurrentMatch }
