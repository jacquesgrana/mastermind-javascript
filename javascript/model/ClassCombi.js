
class Combi {

  tabColor = [NB_COLOR_BY_COMBI];

  constructor(tabColor) {
    this.tabColor = tabColor;
  }

  getTabColor() {
    return this.tabColor;
  }

  getColorNb(number) {
    if ((number <= NB_COLOR_BY_COMBI) && (number >= 0)) {
      return this.tabColor[number];
    }
    else {
      return null;
    }
  }

  setTabColor(tabColor) {
    this.tabColor = tabColor;
  }

  setColorNb(color, number) {
    if ((number <= NB_COLOR_BY_COMBI) && (number >= 0)) {
      this.tabColor[number] = color;
    }
  }
}
