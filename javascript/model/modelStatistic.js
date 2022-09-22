class ModelStatistic {
  turnNumber;
  combiToAdd;
  allPossibleCombi;
  numberGood;
  numberPresent;
  numberCombiKept; // var nombreCombiRetenues = 0;
  numberCombiKeptCumulative; // var nombreCombiCumulee = 0;
  combiPredicted; // var combiPrevue = [NBCOULEUR];
  combiKept; // var combiRetenues
  combiKeptCumulative; //var combiRetenuesCumulees = new Array();
  colorPresencePercent;//var pourcentagePresence = [NBCOUL];


  constructor(turnNumber, numberCombiKept, numberCombiKeptCumulative) {
    console.log("log : création objet model stat");
    this.turnNumber = turnNumber;
    this.numberCombiKept = numberCombiKept;
    this.numberCombiKeptCumulative = numberCombiKeptCumulative;
  }

  getTurnNumber() {
    return this.turnNumber;
  }

  setTurnNumber(turnNumber) {
    this.turnNumber = turnNumber;
  }

  getCombiToAdd() {
    return this.combiToAdd;
  }

  setCombiToAdd(combiToAdd) {
    this.combiToAdd = combiToAdd;
  }

  getAllPossibleCombi() {
    return this.allPossibleCombi;
  }

  setAllPossibleCombi(allPossibleCombi) {
    this.allPossibleCombi = allPossibleCombi;
  }

  getNumberGood() {
    return this.numberGood;
  }

  setNumberGood(numberGood) {
    this.numberGood = numberGood;
  }

  getNumberPresent() {
    return this.numberPresent;
  }

  setNumberPresent(numberPresent) {
    this.numberPresent = numberPresent;
  }

  getNumberCombiKept() {
    return this.numberCombiKept;
  }

  setNumberCombiKept(numberCombiKept) {
    this.numberCombiKept = numberCombiKept;
  }

  getNumberCombiKeptCumulative() {
    return this.numberCombiKeptCumulative;
  }

  setNumberCombiKeptCumulative(numberCombiKeptCumulative) {
    this.numberCombiKeptCumulative = numberCombiKeptCumulative;
  }

  getCombiPredicted() {
    return this.combiPredicted;
  }

  setCombiPredicted(combiPredicted) {
    this.combiPredicted = combiPredicted;
  }

  getCombiKept() {
    return this.combiKept;
  }

  setCombiKept(combiKept) {
    this.combiKept = combiKept;
  }

  //combiKeptCumulative
  getCombiKeptCumulative() {
    return this.combiKeptCumulative;
  }

  setCombiKeptCumulative(combiKeptCumulative) {
    this.combiKeptCumulative = combiKeptCumulative;
  }

  //colorPresencePercent
  getColorPresencePercent() {
    return this.colorPresencePercent;
  }

  setColorPresencePercent(colorPresencePercent) {
    this.colorPresencePercent = colorPresencePercent;
  }

  init() {
    console.log("log : init model stat");
    //let numberMax = this.fact(NB_COLOR_TO_CHOOSE)/this.fact(NB_COLOR_BY_COMBI);
    this.allPossibleCombi = [NB_COMBI_POSSIBLE];
    //console.log("log : nombre combi poss theorique : " + numberMax);
    this.generateAllPossibleCombi();


    this.combiPredicted = [NB_COLOR_BY_COMBI];
    for (let i=0; i<NB_COLOR_BY_COMBI; i++) {
        this.combiPredicted[i] = "nothing";
    }

    this.combiKept = new Array();
    for (let i=0; i<NB_COMBI_POSSIBLE; i++) {
        this.combiKept[i] = [NB_COLOR_BY_COMBI];
    }

    this.combiKeptCumulative = new Array();

    this.colorPresencePercent = [NB_COLOR_TO_CHOOSE];
    for (let i=0; i<NB_COLOR_TO_CHOOSE; i++) {
        this.colorPresencePercent[i]=-1;
    }
  }

  generateAllPossibleCombi() {
    console.log("log : génération des combis possibles");

    let compteur = 0;
    for (let i = 0; i < NB_COLOR_TO_CHOOSE; i++) {
      for (let j = 0; j < NB_COLOR_TO_CHOOSE; j++) {
        for (let k = 0; k < NB_COLOR_TO_CHOOSE; k++) {
          for (let l = 0; l < NB_COLOR_TO_CHOOSE; l++) {

            if ((i != j) && (i != k) && (i != l) && (j != k) && (j != l) && (k != l)) {
              let maCombi = new Array(NB_COLOR_BY_COMBI);
              maCombi[0] = this.getColorName(i);
              maCombi[1] = this.getColorName(j);
              maCombi[2] = this.getColorName(k);
              maCombi[3] = this.getColorName(l);
              this.allPossibleCombi[compteur]= maCombi;
              //console.log("log : combi n° " + compteur + " : " + this.allPossibleCombi[compteur]);
              compteur++;
            }
          }
        }
      }
    }
    //console.log("log : nombre combi poss compté : " + compteur);
  }

  /*
  fact(number) {
    let fact = 1;
    for(let i = 1; i <= number; i++) {
      fact *= i;
    }
    return fact;
  }
  */

  getColorName(id) {
    let valToReturn = "";
    switch (id) {
      case 0:
      valToReturn = "red";
      break;
      case 1:
      valToReturn = "yellow";
      break;
      case 2:
      valToReturn = "blue";
      break;
      case 3:
      valToReturn = "green";
      break;
      case 4:
      valToReturn = "white";
      break;
      case 5:
      valToReturn = "purple";
      break;
      case 6:
      valToReturn = "orange";
      break;
      case 7:
      valToReturn = "fuchsia";
      break;
      default:
      valToReturn = "nothing";
    }
    return valToReturn;
  }

}
