class ControllerEndgame {

  model;
  view;

  constructor(model, view) {
    this.model = model;
    this.view = view;
    console.log("log : objet controller endgame créé");
  }

  init() {
    this.model.init();
    this.view.init();
    console.log("log : init controller endgame");
    let textGameWon = "";
    console.log("log : gameWon : " + this.model.getGameWon());
    if(this.model.getGameWon() === "true") {
      textGameWon ="Gagné";
    }
    else {
      textGameWon ="Perdu";
    }
    this.view.updateResultGame(textGameWon);
    this.view.updateTurnNumber(this.model.getTurnNumber());
    this.displayCombiToFind(this.model.getCombiToFind());
    this.generateLines();
  }

  getModel() {
    return this.model;
  }

  getView() {
    return this.view;
  }


  displayCombiToFind(combiToFind) {
    console.log("log : combiToFind : " + combiToFind);
    for(let i=0; i<NB_COLOR_BY_COMBI; i++) {
      let color = combiToFind[i];
      let html = this.generateHtmlColorImageToFind(color);
      let numberCase = i+1;
      this.view.updateTarget(numberCase, html);
    }
  }

  generateLines() {
    let html = "";
    let turnNumber = this.getModel().getTurnNumber();
    for(let i=1; i<= turnNumber; i++) {
      html+= "<div class='line_combi'>";
      let combi = this.getModel().getCombiPlayed()[i-1];
      html+= this.generateOneLine(combi, i);
      html += "</div>";
    }
    this.getView().addCombiPlayed(html);
  }

  generateOneLine(combiToPrint, turnNumber) {
    let html = generateHtmlNumberImage(turnNumber);
    for(let i=0; i<NB_COLOR_BY_COMBI; i++) {
      if(i === (NB_COLOR_BY_COMBI-1)) {
        html += generateHtmlColorImage(combiToPrint[i], true);
      }
      else {
        html += generateHtmlColorImage(combiToPrint[i], false);
      }
    }
    let goodColorNumber = this.calculateGoodColorNumber(turnNumber, controller.getModel().getCombiPlayed(), controller.getModel().getCombiToFind());
    let presentColorNumber = this.calculatePresentColorNumber(turnNumber, controller.getModel().getCombiPlayed(), controller.getModel().getCombiToFind());
    for(let i=1; i<= goodColorNumber; i++) {
      html += this.generateResultImage("black");
    }
    for(let i=1; i<= presentColorNumber; i++) {
      html += this.generateResultImage("white");
    }
    return html;
  }

  generateResultImage(color) {
    let html = "<img class='icon_result' src='../image/very_small/ico_vs_" + color + ".png'>";
    return html;
  }

  calculateGoodColorNumber(lineNumber, combiPlayed, combiToFind) {
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

  calculatePresentColorNumber(lineNumber, combiPlayed, combiToFind) {
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

  generateHtmlColorImageToFind(color) {
    let html = "<img class='icon_to_find' src='../image/white/";
    switch (color) {
      case "red" :
      html += "ico_wb_red.png";
      break;
      case "yellow" :
      html += "ico_wb_yellow.png";
      break;
      case "blue" :
      html += "ico_wb_blue.png";
      break;
      case "green" :
      html += "ico_wb_green.png";
      break;
      case "white" :
      html += "ico_wb_white.png";
      break;
      case "purple" :
      html += "ico_wb_purple.png";
      break;
      case "orange" :
      html += "ico_wb_orange.png";
      break;
      case "fuchsia" :
      html += "ico_wb_fuchsia.png";
      break;
      default:
      alert("rien");
      html = "";
    }
    html += "'>"
    return html;
  }

}
