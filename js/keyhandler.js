let keysDown = {};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

function GetAxis(axis) {
  if (axis === "Horizontal") {
    if (37 in keysDown || 65 in keysDown) {
      return -1;
    } else if (39 in keysDown || 68 in keysDown) {
      return 1;
    }
  } else if (axis === "Vertical") {
    if (38 in keysDown || 87 in keysDown) {
      return -1;
    } else if (40 in keysDown || 83 in keysDown) {
      return 1;
    }
  }
  return 0;
}