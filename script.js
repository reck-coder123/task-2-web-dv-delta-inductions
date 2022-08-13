let canvas = document.querySelector("canvas")
canvas.height = 600;
canvas.width = 800;
let x = 400;
let y = 100;
let i = 0;
canvas.style.backgroundColor = "black";

let c = canvas.getContext("2d");

function blue_ball() {
  c.beginPath();
  c.fillStyle = "blue";
  c.arc(x, y, 10, 0, 2 * Math.PI, false);
  c.stroke();
  c.strokeStyle = "blue";
  c.fill();


}

function move() {
  document.onkeydown = function (event) {
    switch (event.keyCode) {
      case 37:
        x = x - 8;
        if (x >= 10) {

          c.clearRect(0, 0, canvas.width, canvas.height);
          blue_ball();
          break;
        }

      case 39:
        x = x + 8;
        if (x <= canvas.width - 10) {
          c.clearRect(0, 0, canvas.width, canvas.height);
          blue_ball()
          break;
        }
      case 40:
        y=y+8;
        c.clearRect(0, 0, canvas.width, canvas.height);
        blue_ball()
        break;
    }
  };
}
let tile = [{ p: 50, q: canvas.height - 50 }, { p: 102, q: canvas.height - 10 },];
let dy = 2;
function tiles() {

  tile.forEach((pf) => {
    c.beginPath();
    c.fillStyle = "grey";
    c.fillRect(pf.p, pf.q, 34, 5)
    c.fill();
  })

}

function move_tile() {

  c.clearRect(0, 0, canvas.width, canvas.height);
  tile.forEach((pf) => {
    pf.q -= dy;
  })
  add_tile();
  tiles();
  blue_ball();
  move();
  spikes();
  tile_land();
  //  console.log(y);
  const ani=requestAnimationFrame(move_tile)
  
  if (y-(17.32+i)<=10) {
    cancelAnimationFrame(ani);
    alert("Game Over, Your Score is: "+y)
    location.reload();
  }
}

function add_tile() {
  let last = tile[tile.length - 1];
  tile.push({ p: (Math.random() * 700) + 51, q: last.q + 30 })

}

function spikes() {
  c.beginPath();

  for (var j = 0; j < 40; j++) {
    c.beginPath();
    c.moveTo(j * 20, i);
    c.lineTo(20 * (j + 1), i);
    c.lineTo(10 * (2 * j + 1), 17.32 + i);
    c.fillStyle = "#ffb09c";
    c.fill();


  }
  i = i + 1
}

function tile_land() {
  tile.forEach((pf => {
    let disy = y - pf.q;
    if (x >= pf.p && x <= pf.p + 34 && disy == 10) {
      y=y-dy-20;
      blue_ball();
    }
  }))
}

tiles();
move_tile();
//console.log(i);
