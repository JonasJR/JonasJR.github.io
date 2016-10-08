var c = document.getElementById("game-board");
var ctx = c.getContext("2d");

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var keyPressed = false;
var points = 0;
var level = 1;
var lost = true;
var circle;
var playerCircle;

init();

function init() {
    ctx.font = "50px Verdana";
    ctx.fillStyle = "#985A41";
    ctx.textAlign = "center";
    ctx.fillText("Circle Match!", 400,250, 500);
    ctx.font = "30px Verdana";
    ctx.fillStyle = "#D1A588"
    ctx.fillText("Use spacebar to match the circles!", 400, 350, 700);
    ctx.font = "20px Verdana";
    ctx.fillText("Press return to start the game!", 400, 400, 500);
    ctx.fillStyle = "#ffffff"
}

generateNewCircles();

//gameLoop
function gameLoop() {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.font = "18px Verdana";
  ctx.fillText("Score: " + points + " - Level: " + level  , 100, 30, 500);

  ctx.beginPath();
  ctx.arc(circle.getX(), circle.getY(), circle.getRadius(), 0, 2 * Math.PI, false);
  ctx.lineWidth = circle.getLineWidth();
  ctx.strokeStyle = '#985A41';
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(playerCircle.getX(), playerCircle.getY(), playerCircle.getRadius(), 0, 2 * Math.PI, false);
  ctx.lineWidth = playerCircle.getLineWidth();
  ctx.strokeStyle = '#D1A588';
  ctx.stroke();
  ctx.closePath();

  if(keyPressed){
    check_collision();
    clearInterval(game_interval);
  }
  playerCircle.shrink();
  if(playerCircle.getRadius() <= 0) {
    youLoose();
  }
}

//Checks if the spacebar is being pressed
function keyDownHandler(e) {
  if(e.keyCode == 32){
    keyPressed = true;
  }
  else if (e.keyCode == 13 && lost) {
    points = 0;
    level = 0;
    lost = false;
    generateNewCircles();
    game_interval = setInterval(gameLoop, 16);
  }
}

//Checks if the spacebar is being released
function keyUpHandler(e) {
    if(e.keyCode == 32) {
        keyPressed = false;
        if(!lost){
          game_interval = setInterval(gameLoop, 16);
        }
    }
}

//Checks for the collision of the two circles
function check_collision() {
  if((circle.getRadius()+(circle.getLineWidth()/2)) > (playerCircle.getRadius()) && (circle.getRadius()-(circle.getLineWidth()/2)) < (playerCircle.getRadius())) {
    points++;
    generateNewCircles();
  }
   else {
     youLoose();
   }
}

//generate new circles
function generateNewCircles() {
  if(points < 5){
    circle = new Circle(400, 300, 70, 50, 1, c.width, c.height);
    playerCircle = new Circle(400, 300, 140, 10, 1, c.width, c.height);
  }
  if(points >= 5){
    circle = new Circle(400, 300, randRadius(10, 100), 50, 1.5, c.width, c.height);
    playerCircle = new Circle(400, 300, randRadius((circle.getRadius()+50),150), 10, 1.5, c.width, c.height);
    level = 2;
  }
  if(points >= 15){
    circle = new Circle(400, 300, randRadius(10, 100), randLineWidth(50,5), 1.5, c.width, c.height);
    playerCircle = new Circle(400, 300, randRadius((circle.getRadius()+50),150), randLineWidth(circle.getLineWidth(),2), 1.5, c.width, c.height);
    level = 3;
  }
  if(points >= 25){
    randPosX = randPos();
    randPosY = randPos();
    circle = new Circle(randPosX, randPosY, randRadius(10, 100), randLineWidth(50,5), 1.5, c.width, c.height);
    playerCircle = new Circle(randPosX, randPosY, randRadius((circle.getRadius()+50),150), randLineWidth(circle.getLineWidth(),2), 1.5, c.width, c.height);
    level = 4;
  }
  if(points >= 35){
    randPosX = randPos();
    randPosY = randPos();
    circle = new Circle(randPosX, randPosY, randRadius(10, 100), randLineWidth(50,5), 1.75, c.width, c.height);
    playerCircle = new Circle(randPosX, randPosY, randRadius((circle.getRadius()+50),150), randLineWidth(circle.getLineWidth(),2), 1.75, c.width, c.height);
    level = 5;
  }
  if(points >= 45){
    randPosX = randPos();
    randPosY = randPos();
    circle = new Circle(randPosX, randPosY, randRadius(10, 100), randLineWidth(50,5), 2, c.width, c.height);
    playerCircle = new Circle(randPosX, randPosY, randRadius((circle.getRadius()+50),150), randLineWidth(circle.getLineWidth(),2), 2, c.width, c.height);
    level = 6;
  }
  if(points >= 60){
    randPosX = randPos();
    randPosY = randPos();
    circle = new Circle(randPosX, randPosY, randRadius(10, 100), randLineWidth(50,5), 2.5, c.width, c.height);
    playerCircle = new Circle(randPosX, randPosY, randRadius((circle.getRadius()+50),150), randLineWidth(circle.getLineWidth(),2), 2.5, c.width, c.height);
    level = "ELITE!";
  }
}

//randomize the line width
function randLineWidth(size, min) {
  return Math.floor(Math.random() * size) + min;
}

//randomize the radius
function randRadius(min, max) {
  return Math.floor(Math.random() * max) + min;
}

//randomize the position
function randPos(){
  return Math.floor(Math.random() * 600) + 1;
}

//you loose
function youLoose() {
  lost = true;
  clearInterval(game_interval);
  ctx.font = "40px Verdana";
  ctx.fillText("You loose!", 400, 300, 500);
  ctx.font = "30px Verdana";
  ctx.fillText("Press return to restart the game!", 400, 350, 500);
}
