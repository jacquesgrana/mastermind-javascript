//import ModelHomepage from ../model/modelHomepage.js;
//import ViewHomepage from ../view/viewHomepage.js;

class ControllerHomepage {

  model;
  view;

  constructor(model, view) {
    this.model = model;
    this.view = view;
    console.log("log : objet controller homepage créé");
  }

/*
  constructor() {
    console.log("log : objet controller créé");
  }*/

  init() {
    this.model.init();
    this.view.init();
    console.log("log : init controller homepage");
  }

  static lancementJeu() {
    document.location.href="html/game.html";
  }

}


/*
function lancementJeu() {
    document.location.href="html/game.html";
}
*/
