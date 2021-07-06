const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

let mousex = undefined;
let mousey = undefined;

const emojiCount = 100;
const maxSize = 140;
const displayedEmojiArray = [];

const emojiArray = ["🤣", "😇", "💩", "🦄", "⛄️"];

const debounce = (func) => {
  let timer;
  return (event) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(func, 100, event);
  };
};

window.addEventListener(
  "resize",
  debounce(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
  })
);

const init = () => {
  displayedEmojiArray.length = 0;
  for (let i = 0; i < emojiCount; i++) {
    const size = Math.random() * 30 + 10;
    const x = Math.random() * (innerWidth - size * 2) + size;
    const y = Math.random() * (innerHeight - size * 2) + size;
    const dx = (Math.random() - 0.5) * 2;
    const dy = (Math.random() - 0.5) * 2;

    displayedEmojiArray.push(new MyEmoji(x, y, dx, dy, size));
  }
};

const MyEmoji = function (x, y, dx, dy, size) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.size = size;
  this.minSize = size;
  this.text = emojiArray[Math.floor(Math.random() * emojiArray.length)];

  this.draw = function () {
    c.font = `${this.size}px Courier New`;
    c.fillText(this.text, this.x, this.y);
  };

  this.update = function () {
    if (this.x + this.size > innerWidth || this.x < 0) {
      this.dx = -this.dx;
    }

    if (this.y > innerHeight || this.y - this.size < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    if (
      mousex - this.x < 50 &&
      mousex - this.x > -50 &&
      mousey - this.y < 50 &&
      mousey - this.y > -50
    ) {
      if (this.size < maxSize) {
        this.size += 1;
        c.font = `${this.size}px Courier New`;
      }
    } else {
      if (this.size > this.minSize) {
        this.size -= 1;
        c.font = `${this.size}px Courier New`;
      }
    }
    //end interactivity

    this.draw();
  };
};

const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < displayedEmojiArray.length; i++) {
    displayedEmojiArray[i].update();
  }
};

init();
animate();

window.addEventListener("mousemove", (e) => {
  mousex = e.x;
  mousey = e.y;
});
