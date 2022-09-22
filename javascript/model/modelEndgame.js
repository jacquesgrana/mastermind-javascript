class ModelEndgame {

  gameWon;
  turnNumber;
  combiToFind;
  combiPlayed;

  constructor() {
    console.log("log : objet model endgame créé");
  }

  init() {
    //this.view.init();
    console.log("log : init model endgame");

    ModelEndgame.doSessionRestore(this);
  }

  getGameWon() {
    return this.gameWon;
  }
  setGameWon(gameWon) {
    this.gameWon = gameWon;
  }

  getTurnNumber() {
    return this.turnNumber;
  }
  setTurnNumber(turnNumber) {
    this.turnNumber = turnNumber;
  }

  getCombiToFind() {
    return this.combiToFind;
  }
  setCombiToFind(combiToFind) {
    this.combiToFind = combiToFind;
  }

  getCombiPlayed() {
    return this.combiPlayed;
  }
  setCombiPlayed(combiPlayed) {
    this.combiPlayed = combiPlayed;
  }

  static doSessionRestore(model) {
    model.setGameWon(sessionStorage.getItem("gameWon"));
    console.log("log : gameWon : " + model.getGameWon());
    model.setTurnNumber(sessionStorage.getItem("turnNumber"));
    console.log("log : turnNumber : " + model.getTurnNumber());

    model.setCombiToFind([NB_COLOR_BY_COMBI]);
    let textCombiToFind = sessionStorage.getItem("combiToFind");
    model.setCombiToFind(textCombiToFind.split(",", NB_COLOR_BY_COMBI));
    console.log("log : combiToFind : " + model.getCombiToFind());

    for(let i=0; i<NB_COLOR_BY_COMBI; i++) {
      console.log("log : n° : " + (i+1) + " / couleur : " + model.getCombiToFind()[i]);
    }

    let array = new Array();
    for (let i=0; i<model.getTurnNumber(); i++) {
        array[i] = [NB_COLOR_BY_COMBI];
    }
    model.setCombiPlayed(array);

    let textCombiPlayed = sessionStorage.getItem("combiPlayed");

    let arrayTemp = textCombiPlayed.split(",", model.getTurnNumber()*NB_COLOR_BY_COMBI);

    for(let i=0; i<NB_COLOR_BY_COMBI; i++) {
        for(let j=0; j<model.getTurnNumber(); j++) {
        model.getCombiPlayed()[j][i] = arrayTemp[i+j*NB_COLOR_BY_COMBI];
        //console.log("log : couleur : " + model.getCombiPlayed()[j][i] + " j : " + j + " i : " + i);
        }
    }

    for(let i=0; i<model.getTurnNumber(); i++) {
      let numero = i+1;
      let text = "log : n° combi : " + numero;
      for(let j=0; j<NB_COLOR_BY_COMBI; j++) {
        let numeroCouleur = j+1;
        text += " / n° : " + numeroCouleur + " coul : " + model.getCombiPlayed()[i][j];
      }
      console.log(text);
    }


  }

}
