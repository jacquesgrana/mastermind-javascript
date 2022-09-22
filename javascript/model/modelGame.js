class ModelGame {
  turnNumber;
  combiToPlay;
  combiPlayed;
  combiToFind;
  gameWon;
  gameLost;
  showingStats;

  constructor(turnNumber, combiToPlay, combiPlayed, combiToFind, gameWon, gameLost, showingStats) {
    this.turnNumber = turnNumber;
    this.combiToPlay = combiToPlay;
    this.combiPlayed = combiPlayed;
    this.combiToFind = combiToFind;
    this.gameWon = gameWon;
    this.gameLost = gameLost;
    this.showingStats = showingStats;
    console.log("log : objet model game créé");
  }

  init() {
    //this.view.init();
    for(let i=0; i<NB_COLOR_BY_COMBI; i++) {
      this.combiToPlay[i] = "nothing";
    }
    /*
    for(let j=0; j<NB_MAX_TURN; j++) {
      this.combiPlayed[j] = "nothing";
    }
    */
    ModelGame.initCombiToFind(this);
    console.log("log : init model game");
  }

  getTurnNumber() {
    return this.turnNumber;
  }

  setTurnNumber(turnNumber) {
    this.turnNumber = turnNumber;
  }

  getCombiToPlay() {
    return this.combiToPlay;
  }

  setCombiToPlay(combiToPlay) {
    this.combiToPlay = combiToPlay;
  }

  getCombiPlayed() {
    return this.combiPlayed;
  }

  setCombiPlayed(combiPlayed) {
    this.combiPlayed = combiPlayed;
  }

  getCombiToFind() {
    return this.combiToFind;
  }

  setCombiToFind(combiToFind) {
    this.combiToFind = combiToFind;
  }

  getGameWon() {
    return this.gameWon;
  }

  setGameWon(gameWon) {
    this.gameWon = gameWon;
  }

  getGameLost() {
    return this.gameLost;
  }

  setGameLost(gameLost) {
    this.gameLost = gameLost;
  }

  //showingStats

  getShowingStats() {
    return this.showingStats;
  }

  setShowingStats(showingStats) {
    this.showingStats = showingStats;
  }

  static initCombiToFind(model) {
    console.log("log : génération de la combi à trouver");
    var randomNumber = 0;
    var randomColor = "";
    for (let i = 0; i < NB_COLOR_BY_COMBI; i++) {
        do {
            randomNumber = ModelGame.calculateRandomInteger(NB_COLOR_TO_CHOOSE);
            randomColor = ModelGame.getColorName(randomNumber);
        }
        while (ModelGame.isAlreadyChoose(model.getCombiToFind(), randomColor, i));
        model.getCombiToFind()[i] = randomColor;
    }
    console.log("log : combiToFind : " + model.getCombiToFind());
  }

  static calculateRandomInteger(nbChoix) {
    return Math.floor(Math.random() * Math.floor(nbChoix));
  }

  static isAlreadyChoose(combiToFind, randomColor, colorNumber) {
      if (colorNumber>0) {
          for (var i = 0; i <= colorNumber; i++) {
              if ((i!=colorNumber) && (combiToFind[i] === randomColor)) {
                  return true;
              }
          }
      }
      return false;
  }

  static getColorName(colorNumber) {
      var colorName = "";
      switch (colorNumber) {
              case 0 :
              colorName = "red";
              break;
              case 1 :
              colorName = "yellow";
              break;
              case 2 :
              colorName = "blue";
              break;
              case 3 :
              colorName = "green";
              break;
              case 4 :
              colorName = "white";
              break;
              case 5 :
              colorName = "purple";
              break;
              case 6 :
              colorName = "orange";
              break;
              case 7 :
              colorName = "fuchsia";
              break;
              default:
              alert("rien");
              colorName = "";
              }
      return colorName;
  }


/*
  function calculCombiATrouver(iCombiATrouver) {
      var nombreHasard = 0;
      var couleurHasard = "";
      for (var i = 0; i < NBCOULEUR; i++) {
          do {
              nombreHasard = calculeEntierHasard(NBCOUL);
              couleurHasard = getNomCouleur(nombreHasard);
          }
          while (couleurDejaChoisie(iCombiATrouver,couleurHasard,i));
          iCombiATrouver[i] = couleurHasard;
      }
      // *********************************************************************
      //alert(" test : " + iCombiATrouver);
      return iCombiATrouver;
  }

  function calculeEntierHasard(nbChoix) {
    return Math.floor(Math.random() * Math.floor(nbChoix));
  }

  function getNomCouleur(numeroCouleur) {
      var nomCouleur = "";
      switch (numeroCouleur) {
              case 0 :
              nomCouleur = "Rouge";
              break;
              case 1 :
              nomCouleur = "Jaune";
              break;
              case 2 :
              nomCouleur = "Bleu";
              break;
              case 3 :
              nomCouleur = "Vert";
              break;
              case 4 :
              nomCouleur = "Blanc";
              break;
              case 5 :
              nomCouleur = "Violet";
              break;
              case 6 :
              nomCouleur = "Orange";
              break;
              case 7 :
              nomCouleur = "Fuchsia";
              break;
              default:
              alert("rien");
              nomCouleur = "";
              }
      return nomCouleur;
  }

  function couleurDejaChoisie(iCombiATrouver,iCouleurHasard,numeroCouleur) {
      if (numeroCouleur>0) {
          for (var i = 0; i <= numeroCouleur; i++) {
              if ((i!=numeroCouleur) && (iCombiATrouver[i] === iCouleurHasard)) {
                  return true;
              }
          }
      }


      return false;
  }
  */
}
