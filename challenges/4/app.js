//variables
var totalKeysLength, allKeys, initialJiggleKey, keyPressed;

//methods
window.addEventListener("load", () => {
  allKeys = document.getElementsByClassName("key");
  totalKeysLength = allKeys.length;
  initialJiggleKey = getActualJiggleKey();
  loadRandomKey();
});
window.addEventListener("keyup", () => {
  keyPressed = getKeyPressed(event);
  let actualJiggleDataKey = getActualJiggleKey().getAttribute("data-key");
  if (keyPressed==actualJiggleDataKey) {
      loadRandomKey()
  }
});
var loadRandomKey = () => {
  let keyIndex = getRandomIndex();
  let actualJiggleKey = getActualJiggleKey();
  actualJiggleKey.classList.remove("jiggle");

  while (actualJiggleKey == allKeys[keyIndex]) {
    keyIndex = getRandomIndex();
  }
  allKeys[keyIndex].classList.add("jiggle");
};

var getRandomIndex = () => {
  return Math.floor(Math.random() * totalKeysLength);
};

var getActualJiggleKey = () => {
  return document.getElementsByClassName("jiggle")[0];
};

function getKeyPressed(e) {
  let keynum;
  if (window.event) {
    keynum = e.keyCode;
  } else if (e.which) {
    keynum = e.which;
  }
  switch (true) {
    case keynum == 8:
      return "BACKSPACE";
      break;
    case keynum == 9:
      return "TAB";
      break;
    case keynum == 13:
      return "ENTER";
      break;
    case keynum == 16:
      return "SHIFT";
      break;
    case keynum == 20:
      return "CAPSLOCK";
      break;
    default:
      return String.fromCharCode(keynum);
      break;
  }
}
