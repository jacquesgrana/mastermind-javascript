class Color {
  /*
  static red = new Color("red","../../image/small/ico_small_red.png","../../image/medium/ico_medium_red.png", "../../image/big/ico_big_red.png");
  static yellow = new Color("yellow", "../../image/small/ico_small_yellow.png", "../../image/medium/ico_medium_yellow.png", "../../image/big/ico_big_yellow.png");
  static blue = new Color("blue", "../../image/small/ico_small_blue.png", "../../image/medium/ico_medium_blue.png", "../../image/big/ico_big_blue.png");
  static green = new Color("green", "../../image/small/ico_small_green.png", "../../image/medium/ico_medium_green.png", "../../image/big/ico_big_green.png");
  static white = new Color("white", "../../image/small/ico_small_white.png", "../../image/medium/ico_medium_white.png", "../../image/big/ico_big_white.png");
  static purple = new Color("purple", "../../image/small/ico_small_purple.png", "../../image/medium/ico_medium_purple.png", "../../image/big/ico_big_purple.png");
  static orange = new Color("orange", "../../image/small/ico_small_orange.png", "../../image/medium/ico_medium_orange.png", "../../image/big/ico_big_orange.png");
  static fuchsia = new Color("fuchsia", "../../image/small/ico_small_fuchsia.png", "../../image/medium/ico_medium_fuchsia.png", "../../image/big/ico_big_fuchsia.png");
  static grey = new Color("grey", "../../image/small/ico_small_grey.png", "../../image/medium/ico_medium_grey.png", "../../image/big/ico_big_grey.png");
  static black = new Color("black", "../../image/small/ico_small_black.png", "../../image/medium/ico_medium_black.png", "../../image/big/ico_big_black.png");

  private constructor(name, pathToSmall, pathToMedium, pathToBig) {
  this.name = name;
  this.pathToSmall = pathToSmall;
  this.pathToMedium = pathToMedium;
  this.pathToBig = pathToBig;
}

public toString() {
return (Color.this.name.toString() + " / " Color.this.pathToSmall.toString() + " / " Color.this.pathToMedium.toString() + " / " Color.this.pathToBig.toString());
}
*/

Red = new Color("red", 0);
Yellow = new Color("yellow", 1);
Blue = new Color("blue", 2);
Green = new Color("green", 3);
White = new Color("white", 4);
Purple = new Color("purple", 5);
Orange = new Color("orange", 6);
Fuchsia = new Color("fuchsia", 7);
Grey = new Color("grey", 8);
Black = new Color("black", 9);

constructor(name, number) {
  this.name = name;
  this.number = number;
}

toString() {
  return ("nom couleur : " + this.name.toString() + " / numéro : " + this.number);
}


getColorName() {
  return this.name;
}

getColorNumber() {
  return this.number;
}
static getColorByNumber(number) {
  switch(number) {
    case 0 :
    return Color.Red;
    break;
    case 1 :
    return Color.Yellow;
    break;
    case 2 :
    return Color.Blue;
    break;
    case 3 :
    return Color.Green;
    break;
    case 4 :
    return Color.White;
    break;
    case 5 :
    return Color.Purple;
    break;
    case 6 :
    return Color.Orange;
    break;
    case 7 :
    return Color.Fuchsia;
    break;
    case 8 :
    return Color.Grey;
    break;
    case 9 :
    return Color.Black;
    break;
    default :
    //alert("rien");
    console.log("log : rien depuis le sélecteur");
    return "nothing";
  }
}
/*
public getColorPathToSmall() {
return this.pathToSmall;
}

public getColorPathToMedium() {
return this.pathToMedium;
}

public getColorPathToBig() {
return this.pathToBig;
}
*/
}
