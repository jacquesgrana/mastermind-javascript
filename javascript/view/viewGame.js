class ViewGame {

  constructor() {
    console.log("log : objet view game créé");
  }

  init() {
    console.log("log : init view game");
  }

  updateTurnNumber(turnNumber) {
    document.getElementById("turn_number").innerHTML = turnNumber;
  }

  updateTarget(numeroSource, html) {
    let nomTargetSource = "case_" + numeroSource;
    document.getElementById(nomTargetSource).innerHTML = html;
  }

  getHtmlTarget(numeroSource) {
    let nomTargetSource = "case_" + numeroSource;
    return document.getElementById(nomTargetSource).innerHTML;
  }

  addDiv(html) {
    document.getElementById("bloc_container").innerHTML += html;
  }

  addCombiPlayed(html) {
    document.getElementById("bloc_combi_played").innerHTML = html;
  }

  addHtmlToColorPickBloc(html) {
    document.getElementById("bloc_colors_to_pick").innerHTML += html;
  }

  removeElementFromColorPickBloc(element) {
    document.getElementById("bloc_colors_to_pick").removeChild(element);
  }


  enableButtonSend() {
    document.getElementById("button_send").style.color = "orange";
    document.getElementById("button_send").disabled = false;
    document.getElementById( "button_send" ).onmouseover = function() {this.className = "hover_on"};
    document.getElementById( "button_send" ).onmouseout = function() {this.className = "hover_off"};
  }

  disableButtonSend() {
    document.getElementById("button_send").style.color = "#606060";
    document.getElementById("button_send").disabled = true;
    document.getElementById( "button_send" ).onmouseover = function() {this.className = "hover_off"};
    document.getElementById( "button_send" ).onmouseout = function() {this.className = "hover_off"};
  }

  addButtonStat() {
    console.log("log : affiche bouton des stats");
    let html = "<input id='button_stat' type='button' value='Afficher les statistiques' onclick='toggleStats()'>";
    document.getElementById("bloc_container").innerHTML += html;
  }

  removeDiv(id) {
    let element = document.getElementById(id);
    document.getElementById("bloc_container").removeChild(element);
  }

  toggleTextButtonStat(showStats) {
    if (showStats) {
      document.getElementById("button_stat").setAttribute("value", "Afficher les statistiques");
    }
    else {
      document.getElementById("button_stat").setAttribute("value", "Masquer les statistiques");
    }
  }

  setHtmlStat(html) {
    document.getElementById("bloc_stats").innerHTML = html
  }

}

// todo addColorInBlock
// todo removeColorInBlock
