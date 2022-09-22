class ControllerStatistic {

  model;
  view;

  constructor(model, view) {
    this.model = model;
    this.view = view;
    console.log("log : objet controller stat créé");
  }

  init() {
    this.model.init();
    //this.view.init();
    console.log("log : init controller stat");
  }

  getModel() {
    return this.model;
  }
  getView() {
    return this.view;
  }

  static updateStatistic(controller, combiToAdd, numberGood, numberPresent, turnNumber) {
    console.log("log : update stat");
    controller.getModel().setCombiToAdd(combiToAdd);
    controller.getModel().setNumberGood(numberGood);
    controller.getModel().setNumberPresent(numberPresent);
    controller.getModel().setTurnNumber(turnNumber);
    //console.log("log : turnNumber : " + turnNumber);
    controller.getModel().setNumberCombiKept(ControllerStatistic.calcNumberCombiKept(controller, turnNumber));
    if (turnNumber > 1) {
      //console.log("log : appel fonction setNumberCombiKeptCumulative ***********");
      controller.getModel().setNumberCombiKeptCumulative(ControllerStatistic.calcNumberCombiKeptCumulative(controller, turnNumber));
    }
    else {
      controller.getModel().setCombiKeptCumulative(controller.getModel().getCombiKept()[0]);
    }
    for (let i=0; i<NB_COLOR_TO_CHOOSE; i++) {
      let allwaysPresent = ControllerStatistic.isAllwaysPresent(i, controller.getModel().getCombiKeptCumulative());
      if (allwaysPresent) {
        controller.getModel().getColorPresencePercent()[i] = 100;
      }
      else {
        let neverPresent = ControllerStatistic.isNeverPresent(i, controller.getModel().getCombiKeptCumulative());
        if (neverPresent) {
          controller.getModel().getColorPresencePercent()[i] = 0;
        }
        else {
          controller.getModel().getColorPresencePercent()[i] = ControllerStatistic.calcPercentPresence(i, controller.getModel().getCombiKeptCumulative());
        }
      }
    }

    for (let i=0; i<NB_COLOR_TO_CHOOSE; i++) {
      if (controller.getModel().getColorPresencePercent()[i] === 100) {
        let isAtTheSamePlace = ControllerStatistic.isAtTheSamePlace(i,controller.getModel().getCombiKeptCumulative());
        if (isAtTheSamePlace) {
          let colorPlace = ControllerStatistic.calcPlaceColor(i, controller.getModel().getCombiKeptCumulative());
          controller.getModel().getCombiPredicted()[colorPlace] = ControllerStatistic.getColorName(i);
          //combiPrevue[colorPlace] = i;
        }
      }
    }
  }


static isAtTheSamePlace(indiceCouleur, listeCombiRetenues) {
  let isALaMemePl = true;
  let place = -1;

  for(let i=0; i<listeCombiRetenues.length; i++) {
    for (let j=0; j<NB_COLOR_BY_COMBI; j++) {
      if ((listeCombiRetenues[i][j]) === ControllerStatistic.getColorName(indiceCouleur)) {
        if(i===0) {
          isALaMemePl = true;
          place = j;
        }
        else {
          if (j !== place) {
            isALaMemePl = isALaMemePl && false;
          }
        }

      }
    }
  }
  return isALaMemePl;
}

static calcPlaceColor(indiceCouleur, listeCombiRetenues) {
  var place = -1;
  for (var j=0; j<NB_COLOR_BY_COMBI; j++) {
    //console.log("log : liste combis retenues : " + listeCombiRetenues);
    if (listeCombiRetenues[0][j] === ControllerStatistic.getColorName(indiceCouleur)) {
      place = j;
    }
  }
  return place;
}


  static isAllwaysPresent(numeroCouleur,listeCombi) {
    let isToujourPr = true;
    let maCouleur = ControllerStatistic.getColorName(numeroCouleur);
    for (let i=0; i<listeCombi.length; i++) {
      let maCombi = listeCombi[i];
      let isPresente = (maCombi[0] == maCouleur) || (maCombi[1] == maCouleur) || (maCombi[2] == maCouleur) || (maCombi[3] == maCouleur);
      if (isPresente) {
        isToujourPr = isToujourPr && true;
      }
      else {
        isToujourPr = isToujourPr && false;
      }
    }
  return isToujourPr;
  }

  static isNeverPresent(numeroCouleur,listeCombi) {
    let isJamaisPr = true;
    let maCouleur = ControllerStatistic.getColorName(numeroCouleur);
    for (let i=0; i<listeCombi.length; i++) {
      let maCombi = listeCombi[i];
      let isPresente = (maCombi[0] == maCouleur) || (maCombi[1] == maCouleur) || (maCombi[2] == maCouleur) || (maCombi[3] == maCouleur);
      if (isPresente) {
        isJamaisPr = isJamaisPr && false;
      }
      else {
        isJamaisPr = isJamaisPr && true;
      }
    }
  return isJamaisPr;
  }

  static calcPercentPresence(numeroCouleur,listeCombi) {
    let compteur = 0;
    let percent = 0;
    let maCouleur = ControllerStatistic.getColorName(numeroCouleur);
    for (let i=0; i<listeCombi.length; i++) {
      let maCombi = listeCombi[i];
      let isPresente = (maCombi[0] == maCouleur) || (maCombi[1] == maCouleur) || (maCombi[2] == maCouleur) || (maCombi[3] == maCouleur);
      if (isPresente) {
        compteur++;
      }
    }
    percent = (compteur/ listeCombi.length) * 100;
    percent = Math.round(percent);
    return percent;
  }

  static getColorName(colorNumber) {
    let colorName = "";
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

  static calcNumberCombiKeptCumulative(controller, turnNumber) {
    let compteur = 0;
    let intersection = new Array();
    intersection = ControllerStatistic.calcIntersection(controller.getModel().getCombiKeptCumulative(), controller.getModel().getCombiKept()[turnNumber-1]);
    //console.log("log : intersection : " + intersection);
    controller.getModel().setCombiKeptCumulative(intersection);
    compteur = controller.getModel().getCombiKeptCumulative().length;
    return compteur;
  }

  static calcNumberCombiKept(controller, turnNumber) {
    let numberCombi = 0;
    let i = turnNumber - 1;
    let numberColorGood = controller.getModel().getNumberGood();
    let numberColorPresent = controller.getModel().getNumberPresent();
    controller.getModel().getCombiKept()[i] = new Array();
    let compteur = 0;
    for (let j=0; j<NB_COMBI_POSSIBLE; j++) {
      let combiPlayed = controller.getModel().getCombiToAdd();
      let numberColorGoodJ = calcNumberCombiGood(combiPlayed, controller.getModel().getAllPossibleCombi()[j]);
      let numberColorPresentJ = calcNumberCombiPresent(combiPlayed, controller.getModel().getAllPossibleCombi()[j]);
      if ((numberColorGoodJ == numberColorGood) && (numberColorPresentJ == numberColorPresent)) {
        controller.getModel().getCombiKept()[i][compteur] = controller.getModel().getAllPossibleCombi()[j];
        compteur++;
      }
    }
    numberCombi = compteur;
    return numberCombi;
  }

  static calcIntersection(listei,listej) {
    let intersection = new Array();
    let compteur = 0
    for (let i=0; i<listei.length; i++) {
      for (let j=0; j<listej.length; j++) {
        if (listei[i] === listej[j]) {
          intersection[compteur] = listei[i];
          compteur++;
        }
      }
    }
    return intersection;
  }

  static isItPresentColor(presencePercent) {
    for(let i=0; i<NB_COLOR_TO_CHOOSE; i++) {
      if (presencePercent[i] === 100) {
        return true;
      }
    }
    return false;
  }

  static isItAbsentColor(presencePercent) {
    for(let i=0; i<NB_COLOR_TO_CHOOSE; i++) {
      if (presencePercent[i] === 0) {
        return true;
      }
    }
    return false;
  }

}
