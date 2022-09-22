class ViewEndgame {

  constructor() {
    console.log("log : objet view endgame créé");
  }

  init() {
    console.log("log : init view endgame");
  }

  updateResultGame(textGameWon) {
    document.getElementById("result_game_won").innerHTML = textGameWon;
  }

  updateTurnNumber(textTurnNumber) {
    document.getElementById("turn_number").innerHTML = textTurnNumber;
  }

  addCombiPlayed(html) {
    document.getElementById("bloc_combi_played").innerHTML = html;
  }

  updateTarget(numeroSource, html) {
    let nomTargetSource = "case_" + numeroSource;
    document.getElementById(nomTargetSource).innerHTML = html;
  }
}
