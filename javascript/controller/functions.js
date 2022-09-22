function calcNumberCombiGood(combiJouees,combiATrouver) {
  var nb = 0;
  for(var i = 0; i < NB_COLOR_BY_COMBI; i++) {
    for(var j = 0; j < NB_COLOR_BY_COMBI; j++) {
      //alert("i : " + i + " j : " + j);
      if ((combiJouees[i] === combiATrouver[j]) && (i === j)) {
        nb++;
      }
    }
  }

  return nb;
}

function calcNumberCombiPresent(combiJouees,combiATrouver) {
  var nb = 0;
  for(var i = 0; i < NB_COLOR_BY_COMBI; i++) {
    for(var j = 0; j < NB_COLOR_BY_COMBI; j++) {
      //alert("i : " + i + " j : " + j);
      if ((combiJouees[i] === combiATrouver[j]) && (i !== j)) {
        nb++;
      }
    }
  }

  return nb;
}

function fact(number) {
  let fact = 1;
  for(let i = 1; i <= number; i++) {
    fact *= i;
  }
  return fact;
}

function generateHtmlNumberImage(number) {
  let html = "<img class='icon_number' src='../image/number/";
  switch (number) {
    case 1 :
    html += "ico_one.png";
    break;
    case 2 :
    html += "ico_two.png";
    break;
    case 3 :
    html += "ico_three.png";
    break;
    case 4 :
    html += "ico_four.png";
    break;
    case 5 :
    html += "ico_five.png";
    break;
    case 6 :
    html += "ico_six.png";
    break;
    case 7 :
    html += "ico_seven.png";
    break;
    case 8 :
    html += "ico_eight.png";
    break;
    case 9 :
    html += "ico_nine.png";
    break;
    case 10 :
    html += "ico_ten.png";
    break;
    case 11 :
    html += "ico_eleven.png";
    break;
    case 12 :
    html += "ico_twelve.png";
    break;
    default:
    html += "nothing";
  }
  html += "'>";
  return html;
}

function generateHtmlColorImage(color, isLast) {
  let html = "";
  if(isLast) {
    html = "<img class='icon_line last_icon_line' src='../image/medium/";
  }
  else {
    html = "<img class='icon_line' src='../image/medium/";
  }

  switch (color) {
    case "red" :
    html += "ico_medium_red.png";
    break;
    case "yellow" :
    html += "ico_medium_yellow.png";
    break;
    case "blue" :
    html += "ico_medium_blue.png";
    break;
    case "green" :
    html += "ico_medium_green.png";
    break;
    case "white" :
    html += "ico_medium_white.png";
    break;
    case "purple" :
    html += "ico_medium_purple.png";
    break;
    case "orange" :
    html += "ico_medium_orange.png";
    break;
    case "fuchsia" :
    html += "ico_medium_fuchsia.png";
    break;
    default:
    alert("rien");
    html = "";
  }
  html += "'>"
  return html;
}
