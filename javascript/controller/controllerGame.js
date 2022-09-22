class ControllerGame {

  model;
  view;

  constructor(model, view) {
    this.model = model;
    this.view = view;
    console.log("log : objet controller game créé");
  }

  // todo dans init ajouter gestion de la restauration des données si possible
  init() {
    this.model.init();
    this.view.init();
    this.view.updateTurnNumber(this.model.getTurnNumber());
    console.log("log : init controller game");
  }

  getModel() {
    return this.model;
  }

  getView() {
    return this.view;
  }

  static sendCombi(controller, controllerStatistic) {
    console.log("log : test combi lancé");

    if ((controller.getModel().getTurnNumber() >= 1) && (controller.getModel().getTurnNumber() <= NB_MAX_TURN)) {
      let indice = controller.getModel().getTurnNumber() -1;
      controller.getModel().getCombiPlayed()[indice] = [...controller.getModel().getCombiToPlay()];
      if(controller.getModel().getTurnNumber() === 1) {
        controller.getView().addDiv('<div id="bloc_combi_played"></div>');
      }
      ControllerGame.generateLines(controller);
      let goodColorNumber = ControllerGame.calculateGoodColorNumber(controller.getModel().getTurnNumber(), controller.getModel().getCombiPlayed(), controller.getModel().getCombiToFind());
      let presentColorNumber = ControllerGame.calculatePresentColorNumber(controller.getModel().getTurnNumber(), controller.getModel().getCombiPlayed(), controller.getModel().getCombiToFind());
      if (goodColorNumber === NB_COLOR_BY_COMBI) {
        controller.getModel().setGameWon(true);
        console.log("log : gagné !!");
      }
      else {
        if ((controller.getModel().getTurnNumber() === NB_MAX_TURN) && !controller.getModel().getGameWon()) {
          controller.getModel().setGameLost(true);
          console.log("log : perdu !!");
        }
      }

      console.log("log : nb good : " + goodColorNumber + " / nb present : " + presentColorNumber);
      ControllerStatistic.updateStatistic(controllerStatistic, controller.getModel().getCombiToPlay(), goodColorNumber, presentColorNumber, controller.getModel().getTurnNumber());
      if(controller.getModel().getTurnNumber() === 2) {
        controller.getView().addButtonStat();
      }
      if ((controller.getModel().getTurnNumber() >= 2) && (controller.getModel().getShowingStats())) {
        ControllerGame.generateHtmlStats(controller, controllerStatistic);
      }
      if (!controller.getModel().getGameWon() && !controller.getModel().getGameLost()) {
        controller.getModel().setTurnNumber(controller.getModel().getTurnNumber() +1);
        controller.getView().updateTurnNumber(controller.getModel().getTurnNumber());
      }
      else {
        ControllerGame.doSessionStorageToEndGame(controller.getModel().getGameWon(),
        controller.getModel().getGameLost(),
        controller.getModel().getTurnNumber(),
        controller.getModel().getCombiToFind(),
        controller.getModel().getCombiPlayed());
        document.location.href="endgame.html";
      }
    }
    controller.getView().disableButtonSend();
  }

  static doSessionStorageToEndGame(gameWon, gameLost, turnNumber, combiToFind, combiPlayed) {
    if(gameWon) {
      sessionStorage.setItem("gameWon",true);
    }
    if(gameLost && !gameWon) {
      sessionStorage.setItem("gameWon",false);
    }
    sessionStorage.setItem("turnNumber", turnNumber);
    sessionStorage.setItem("combiToFind", combiToFind);
    sessionStorage.setItem("combiPlayed", combiPlayed);
  }

  static generateLines(controller) {
    let html = "";
    let turnNumber = controller.getModel().getTurnNumber();
    for(let i=1; i<= turnNumber; i++) {
      html+= "<div class='line_combi'>";
      let combi = controller.getModel().getCombiPlayed()[i-1];
      html+= ControllerGame.generateOneLine(combi, i);
      html += "</div>";
    }
    controller.getView().addCombiPlayed(html);
  }

  static generateOneLine(combiToPrint,turnNumber) {
    let html = generateHtmlNumberImage(turnNumber);
    for(let i=0; i<NB_COLOR_BY_COMBI; i++) {
      if(i === (NB_COLOR_BY_COMBI-1)) {
        html += generateHtmlColorImage(combiToPrint[i], true);
      }
      else {
        html += generateHtmlColorImage(combiToPrint[i], false);
      }
    }
    let goodColorNumber = ControllerGame.calculateGoodColorNumber(turnNumber, controller.getModel().getCombiPlayed(), controller.getModel().getCombiToFind());
    let presentColorNumber = ControllerGame.calculatePresentColorNumber(turnNumber, controller.getModel().getCombiPlayed(), controller.getModel().getCombiToFind());
    for(let i=1; i<= goodColorNumber; i++) {
      html += ControllerGame.generateResultImage("black");
    }
    for(let i=1; i<= presentColorNumber; i++) {
      html += ControllerGame.generateResultImage("white");
    }
    return html;
  }

  static generateResultImage(color) {
    let html = "<img class='icon_result' src='../image/very_small/ico_vs_" + color + ".png'>";
    return html;
  }

  static calculateGoodColorNumber(lineNumber, combiPlayed, combiToFind) {
    let nb = 0;
    for(let i = 0; i < NB_COLOR_BY_COMBI; i++) {
      for(let j = 0; j < NB_COLOR_BY_COMBI; j++) {
        if ((combiPlayed[lineNumber-1][i] === combiToFind[j]) && (i === j)) {
          nb++;
        }
      }
    }
    return nb;
  }

  static calculatePresentColorNumber(lineNumber, combiPlayed, combiToFind) {
    let nb = 0;
    for(let i = 0; i < NB_COLOR_BY_COMBI; i++) {
      for(let j = 0; j < NB_COLOR_BY_COMBI; j++) {
        if ((combiPlayed[lineNumber-1][i] === combiToFind[j]) && (i !== j)) {
          nb++;
        }
      }
    }
    return nb;
  }

  static allowDrop(ev) {
    ev.preventDefault();
  }

  static drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  static drop(ev, numeroTarget, controller) {
    console.log("log : drop détecté");
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let couleurSource = ControllerGame.getColorBySrc(data, controller);
    if(ControllerGame.isAlreadyChosen(couleurSource, controller)) {
      let numSource = ControllerGame.getNumTargetSource(couleurSource, controller);
      let nouveauHtml = controller.getView().getHtmlTarget(numSource);
      if (controller.getModel().getCombiToPlay()[numeroTarget-1].valueOf() !== "nothing") {
        let ancienHtml = controller.getView().getHtmlTarget(numeroTarget);
        controller.getView().updateTarget(numeroTarget, nouveauHtml);
        controller.getView().updateTarget(numSource, ancienHtml);
        let temp = controller.getModel().getCombiToPlay()[numeroTarget-1];
        controller.getModel().getCombiToPlay()[numeroTarget-1] = controller.getModel().getCombiToPlay()[numSource-1];
        controller.getModel().getCombiToPlay()[numSource-1] = temp;
      }
      else {
        controller.getView().updateTarget(numeroTarget, nouveauHtml);
        controller.getView().updateTarget(numSource, '<img class="icon_grey" src="../image/white/ico_wb_grey.png">');
        controller.getModel().getCombiToPlay()[numeroTarget-1] = controller.getModel().getCombiToPlay()[numSource-1];
        controller.getModel().getCombiToPlay()[numSource-1] = "nothing";
      }
    }
    else {
      if(data.valueOf().substring(0,4) === "icon") {
        if (controller.getModel().getCombiToPlay()[numeroTarget-1].valueOf() !== "nothing") {
          let ancienHtml = controller.getView().getHtmlTarget(numeroTarget);
          controller.getView().addHtmlToColorPickBloc(ancienHtml);
          controller.getView().updateTarget(numeroTarget, '<img class="icon_grey" src="../image/white/ico_wb_grey.png">');
        }
        let element = document.getElementById(data);
        controller.getView().removeElementFromColorPickBloc(element);
        let nouveauHtml = element.outerHTML;
        controller.getModel().getCombiToPlay()[numeroTarget-1] = couleurSource;
        controller.getView().updateTarget(numeroTarget, nouveauHtml);
      }
    }
    ControllerGame.testCombiToEnableButton(controller);
  }

  static dropReturn(ev, controller) {
    console.log("log : drop return détecté");
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    if(data.valueOf().substring(0,4) === "icon") {
      if(data.valueOf().substring(0,9) !== "icon_grey") {
        let couleurSource = ControllerGame.getColorBySrc(data, controller);
        if (ControllerGame.isAlreadyChosen(couleurSource, controller)) {
          let numeroSource = ControllerGame.getNumTargetSource(couleurSource, controller);
          let html = controller.getView().getHtmlTarget(numeroSource);
          controller.getView().updateTarget(numeroSource, '<img class="icon_grey" src="../image/white/ico_wb_grey.png">');
          controller.getModel().getCombiToPlay()[numeroSource-1] = "nothing";
          controller.getView().addHtmlToColorPickBloc(html);
          ControllerGame.testCombiToEnableButton(controller);
        }
      }
    }
  }

  static testCombiToEnableButton(controller) {
    let isOk = true;
    for (let i=0; i<NB_COLOR_BY_COMBI; i++) {
      if(controller.getModel().getCombiToPlay()[i] === "nothing") {
        isOk = isOk && false;
      }
      else {
        isOk = isOk && true;
      }
    }
    if(controller.getModel().getTurnNumber() > 1) {
      isOk = isOk && ControllerGame.isCombiNotAlreadyPlayed(controller);
    }
    if (isOk) {
      controller.getView().enableButtonSend();
    }
    else {
      controller.getView().disableButtonSend();
    }
  }

  static isCombiNotAlreadyPlayed(controller) {
    let isOk = true;
    for(let i=0; i<controller.getModel().getTurnNumber()-1; i++) {
      if (ControllerGame.isEqual(controller.getModel().getCombiToPlay(), controller.getModel().getCombiPlayed()[i])) {
        isOk = isOk && false;
        //console.log("log : combi déjà présente");
      }
      else {
        isOk = isOk && true;
        //console.log("log : combi pas déjà présente");
      }
    }
    return isOk;
  }

  static isEqual(combi1, combi2){
    let isOk = true;
    for(let j=0; j<NB_COLOR_BY_COMBI; j++) {
      if(combi1[j].valueOf() === combi2[j].valueOf()) {
        isOk = isOk && true;
      }
      else {
        isOk = isOk && false;
      }
    }
    return isOk
  }

  static isAlreadyChosen(color, controller) { // TODO changer nom
    for(let i=0; i<NB_COLOR_BY_COMBI; i++) {
      if(controller.getModel().getCombiToPlay()[i].valueOf() === color) {
        return true;
      }
    }
    return false;
  }

  static getNumTargetSource(colorSource, controller) {
    for(let i=0; i<NB_COLOR_BY_COMBI; i++) {
      if(controller.getModel().getCombiToPlay()[i].valueOf() === colorSource) {
        return (i+1);
      }
    }
    return 0;
  }

  static getColorBySrc(data) {
    let valToReturn = 0;
    switch (data) {
      case "icon_red":
      valToReturn = "red";
      break;
      case "icon_yellow":
      valToReturn = "yellow";
      break;
      case "icon_blue":
      valToReturn = "blue";
      break;
      case "icon_green":
      valToReturn = "green";
      break;
      case "icon_white":
      valToReturn = "white";
      break;
      case "icon_purple":
      valToReturn = "purple";
      break;
      case "icon_orange":
      valToReturn = "orange";
      break;
      case "icon_fuchsia":
      valToReturn = "fuchsia";
      break;
      default:
      valToReturn = 0;
    }
    return valToReturn;
  }

  static toggleStats(controller, controllerStatistic) {
    if(!controller.getModel().getShowingStats()) {
      console.log("log : affiche les stats");
      controller.getView().addDiv("<div id='bloc_stats'></div>");
      controller.getView().toggleTextButtonStat(controller.getModel().getShowingStats());
      ControllerGame.generateHtmlStats(controller, controllerStatistic);
      controller.getModel().setShowingStats(true);
    }
    else {
      console.log("log : masque les stats");
      controller.getView().removeDiv("bloc_stats");
      controller.getView().toggleTextButtonStat(controller.getModel().getShowingStats());
      controller.getModel().setShowingStats(false);
    }
  }

  static generateHtmlStats(controllerGame, controllerStatistic) {
    let html = "<h2 class='text_orange'>Statistiques</h2>";
    let nombreCombiRetenues = controllerStatistic.getModel().getNumberCombiKept();
    let numeroTour = controllerGame.getModel().getTurnNumber();
    let nombreCombiCumulee = controllerStatistic.getModel().getNumberCombiKeptCumulative();
    if (numeroTour > 1) {
      html += "<div class='bloc_stats_intern'><h4 class='title_stats'>Nombre de combinaisons possibles pour ce tour : <span class='text_orange'>" + nombreCombiRetenues + "</span></h4>";
      html +="<h4 class='title_stats'>Nombre de combinaisons possibles cumulées : <span class='text_orange'>" + nombreCombiCumulee + "</span></h4></div>";
      let combiRetenuesCumulees = controllerStatistic.getModel().getCombiKeptCumulative();
      if (combiRetenuesCumulees.length < 5) {
        html +="<div class='bloc_stats_intern'><h4 class='title_stats'>Combinaisons retenues</h4>";
        for (let i=0; i < combiRetenuesCumulees.length; i++) {
          html +="<div class='bloc_combi_kept'><h5 class='title_stats'>Combinaison n° " + (i+1) + "</h5>" + ControllerGame.generateHtmlCombiKeptCumulative(combiRetenuesCumulees[i]) + "</div>";
        }
        html+="</div>";
      }
    }

    let presencePercent = controllerStatistic.getModel().getColorPresencePercent();

    // ajouter <div class='bloc_stats_intern'> si un ou l'autre
    if (ControllerStatistic.isItPresentColor(presencePercent) || ControllerStatistic.isItAbsentColor(presencePercent)) {
      html += "<div class='bloc_stats_intern'>";
    }

    if (ControllerStatistic.isItPresentColor(presencePercent)) {
      html +="<div class='bloc_presence_color'><h4 class='title_stats'>Couleurs(s) présente(s)</h4>";
      //html +="";
      for (let j=0; j<NB_COLOR_TO_CHOOSE; j++) {
        if (presencePercent[j] === 100) {
          html +="<img class='ico_stats' src='" + ControllerGame.getSrcColorById(j) + "'>";
        }
      }
      html +="</div>";
    }

    if (ControllerStatistic.isItAbsentColor(presencePercent)) {
      html +="<div class='bloc_presence_color'><h4 class='title_stats'>Couleurs(s) absente(s)</h4>";
      //html +="";
      for (let j=0; j<NB_COLOR_TO_CHOOSE; j++) {
        if (presencePercent[j] === 0) {
          html +="<img class='ico_stats' src='" + ControllerGame.getSrcColorById(j) + "'>";
        }
      }
      html +="</div>";
    }

    // ajouter </div>
    if (ControllerStatistic.isItPresentColor(presencePercent) || ControllerStatistic.isItAbsentColor(presencePercent)) {
      html += "</div>";
    }

    let copyToSort = [NB_COLOR_TO_CHOOSE];
    for(let i=0; i<NB_COLOR_TO_CHOOSE; i++) {
      let element = [2];
      element[0] = ControllerGame.getSrcColorById(i);
      element[1] = presencePercent[i];
      copyToSort[i] = element;
    }
    let sortFunction = function(element1, element2) {
      return(element2[1] - element1[1]);
    }
    copyToSort.sort(sortFunction);
    html +="<div class='bloc_stats_intern'><h4 class='title_stats'>Probabilités de présence</h4>";
    for (let j=0; j<NB_COLOR_TO_CHOOSE; j++) {
      html +="<div class='bloc_percent'><img class='ico_stats' src='" + copyToSort[j][0] + "'><span class='text_stats'>" + copyToSort[j][1] + "%</span></div>";
    }
    html +="</div>";
    html +="<div class='bloc_stats_intern'><h4 class='title_stats'>Combinaison prévue</h4>"
    html +="<div class='bloc_combi_predicted'>";
    let combiPredicted = controllerStatistic.getModel().getCombiPredicted();
    for (let j=0; j<NB_COLOR_BY_COMBI; j++) {
      if (combiPredicted[j] === "nothing") {
        html +="<img class='ico_combi_predicted' src='../image/medium/ico_medium_grey.png'>";
      }
      else {
        html +="<img class='ico_combi_predicted' src='../image/medium/" + ControllerGame.generateHtmlColorImagePredicted(combiPredicted[j]) + "'>";
      }
    }
    html +="</div></div>";
    controllerGame.getView().setHtmlStat(html);
  }

  static generateHtmlCombiKeptCumulative(combi) {
    let html = "";
    for (let i=0; i<NB_COLOR_BY_COMBI; i++) {
      html += "<img class='ico_combi_kept_cumulative' src='../image/medium/" + ControllerGame.generateHtmlColorImagePredicted(combi[i]) + "'>"
    }
    return html;
  }

  static getSrcColorById(id) {
    let html = "../image/medium/";
    switch (id) {
      case 0 :
      html += "ico_medium_red.png";
      break;
      case 1 :
      html += "ico_medium_yellow.png";
      break;
      case 2 :
      html += "ico_medium_blue.png";
      break;
      case 3 :
      html += "ico_medium_green.png";
      break;
      case 4 :
      html += "ico_medium_white.png";
      break;
      case 5 :
      html += "ico_medium_purple.png";
      break;
      case 6 :
      html += "ico_medium_orange.png";
      break;
      case 7 :
      html += "ico_medium_fuchsia.png";
      break;
      default:
      alert("rien");
      html = "nothing";
    }
    return html;
  }

  static generateHtmlColorImagePredicted(color) {
    let html = "";
    switch (color) {
      case "red" :
      html += "ico_medium_red.png";
      break;
      case "yellow" :
      html += "ico_medium_yellow.png";
      break;
      case "blue" :
      html += "ico_medium_blue.png";
      break;
      case "green" :
      html += "ico_medium_green.png";
      break;
      case "white" :
      html += "ico_medium_white.png";
      break;
      case "purple" :
      html += "ico_medium_purple.png";
      break;
      case "orange" :
      html += "ico_medium_orange.png";
      break;
      case "fuchsia" :
      html += "ico_medium_fuchsia.png";
      break;
      default:
      alert("rien");
      html = "nothing";
    }
    return html;
  }
}
