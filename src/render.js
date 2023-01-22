const { screen } = require("electron");
const mouse = require("mouse");

const { width, height } = screen.getPrimaryDisplay().workAreaSize;
const menuBarHeight = screen.getMenuBarHeight();

let activeHighlight;

const canvas = document.querySelector("canvas");
canvas.setAttribute("height", height);
canvas.setAttribute("width", width);
const ctx = canvas.getContext("2d");

const clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const setMouseLocation = () => {
  const { x, y } = screen.getCursorScreenPoint();

  clear();
  ctx.fillStyle = "rgba(0,0,0,0.75)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  ctx.translate(x - x * 20, 0);
  ctx.scale(20, 1);
  ctx.filter = "blur(10px)";
  ctx.beginPath();
  ctx.arc(x, y - menuBarHeight, 30, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.restore();
};

const init = () => {
  setMouseLocation();

  mouse.on("move", () => {
    if (activeHighlight) {
      setMouseLocation();
    }
  });

  mouse.on("left-down", () => {
    clear();
  });

  mouse.on("left-up", (x, y) => {
    if (activeHighlight) {
      setMouseLocation();
    }
  });
};

const toggleMouseHighlight = () => {
  if (activeHighlight) {
    activeHighlight = false;
    clear();
  } else {
    activeHighlight = true;
    setMouseLocation();
  }
};

window.toggleMouseHighlight = toggleMouseHighlight;

init();
