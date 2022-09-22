
  const model = new ModelEndgame();
  const view = new ViewEndgame();
  const controller = new ControllerEndgame(model, view);

  function initEndGame() {
    controller.init();
    console.log("log : init endgame");
  }

  function returnToGame() {
    document.location.href="game.html";
  }
