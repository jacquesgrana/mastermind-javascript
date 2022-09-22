var combiTP = [NB_COLOR_BY_COMBI];
var combiPlayed = [NB_MAX_TURN];
var combiTF = [NB_COLOR_BY_COMBI];
const model = new ModelGame(1, combiTP, combiPlayed, combiTF, false, false, false);
const view = new ViewGame();
const controller = new ControllerGame(model, view);

const modelStatistic = new ModelStatistic(0,0);
const controllerStatistic = new ControllerStatistic(modelStatistic, view);

function initGame() {
  console.log("log : init game");
  controller.init();
  controllerStatistic.init();
}

function drop(ev, numeroTarget) {
  ControllerGame.drop(ev, numeroTarget, controller);
}

function dropReturn(ev) {
  ControllerGame.dropReturn(ev, controller);
}

function sendCombi() {
  ControllerGame.sendCombi(controller, controllerStatistic);
}

function updateStatistic(combiToAdd, numberGood, numberPresent) {
  ControllerStatistic.updateStatistic(controllerStatistic, combiToAdd, numberGood, numberPresent);
}

function toggleStats() {
  ControllerGame.toggleStats(controller, controllerStatistic);
}
/*
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

// faire fonctions dans la vue pour mettre a jour case_n et bloc_colors_to_pick
function drop(ev, numeroTarget) {
  console.log("log : drop détecté");
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var couleurSource = getCouleur(data);
  var nomTarget = "case_" + numeroTarget;
  if(dejaChoisie(couleurSource)) {
    var numSource = getNumTargetSource(couleurSource);
    var nomTargetSource = "case_" + numSource;
    var nouveauHtml = document.getElementById(nomTargetSource).innerHTML;
    if (combiTP[numeroTarget-1].valueOf() !== "nothing") {
      var ancienHtml = document.getElementById(nomTarget).innerHTML;
      document.getElementById(nomTarget).innerHTML = nouveauHtml;
      document.getElementById(nomTargetSource).innerHTML = ancienHtml;
      let temp = combiTP[numeroTarget-1];
      combiTP[numeroTarget-1] = combiTP[numSource-1];
      combiTP[numSource-1] = temp;
    }
    else {
      document.getElementById(nomTarget).innerHTML = nouveauHtml;
      document.getElementById(nomTargetSource).innerHTML = '<img class="icon_grey" src="../image/white/ico_wb_grey.png">';
      combiTP[numeroTarget-1] = combiTP[numSource-1];
      combiTP[numSource-1] = "nothing";
    }
  }
  else {
    if(data.valueOf().substring(0,4) === "icon") {
      if (combiTP[numeroTarget-1].valueOf() !== "nothing") {
        var ancienHtml = document.getElementById(nomTarget).innerHTML;
        document.getElementById("bloc_colors_to_pick").innerHTML += ancienHtml;
        document.getElementById(nomTarget).innerHTML = '<img class="icon_grey" src="../image/white/ico_wb_grey.png">';
      }
      var element = document.getElementById(data);
      document.getElementById("bloc_colors_to_pick").removeChild(element);
      var nouveauHtml = element.outerHTML;
      combiTP[numeroTarget-1] = couleurSource;
      document.getElementById(nomTarget).innerHTML = nouveauHtml;
    }
  }
}

function dropReturn(ev) {
  console.log("log : drop return détecté");
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  if(data.valueOf().substring(0,4) === "icon") {
    if(data.valueOf().substring(0,9) !== "icon_grey") {
      var couleurSource = getCouleur(data);
      if (dejaChoisie(couleurSource)) {
        var numeroSource = getNumTargetSource(couleurSource);
        var nomTargetSource = "case_" + numeroSource;
        var html = document.getElementById(nomTargetSource).innerHTML;
        document.getElementById(nomTargetSource).innerHTML = '<img class="icon_grey" src="../image/white/ico_wb_grey.png">';
        combiTP[numeroSource-1] = "nothing";
        document.getElementById("bloc_colors_to_pick").innerHTML += html;
      }
    }
  }
}

function dejaChoisie(couleur) { // TODO changer nom

  for(let i=0; i<NB_COLOR_BY_COMBI; i++) {
    if(combiTP[i].valueOf() === couleur) {
      return true;
    }
  }
  return false;
}

function getNumTargetSource(colorSource) {
  for(let i=0; i<NB_COLOR_BY_COMBI; i++) {
    if(combiTP[i].valueOf() === colorSource) {
      return (i+1);
    }
  }
  return 0;
}

function getCouleur(data) { // TODO changer nom
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
*/
