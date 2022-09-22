//import Model from ../model/modelHomepage.js;
//import View from ../view/viewHomepage.js;
//import Controller from controllerHomepage.js;


function initPage() {
  const model = new ModelHomepage();
  const view = new ViewHomepage();
  const app = new ControllerHomepage(model, view);
  app.init();
  console.log("log : init homepage");
}

/*
function lancementJeu() {
  document.location.href="html/game.html";
}
*/
