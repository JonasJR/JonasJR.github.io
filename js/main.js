var c = document.getElementById("game-board");
var cHigh = document.getElementById("highscore-board");
var ctx = c.getContext("2d");
var ctxHigh = cHigh.getContext("2d");

var levelSound = new Audio("audio/level.wav");
var scoreSound = new Audio("audio/score.wav");
var gameOverSound = new Audio("audio/gameover.wav");
var song = new Audio("audio/music.mp3");
song.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
}, false);
song.play();

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var uName1 = "";
var uName2 = "";
var uName3 = "";
var hScore1 = "";
var hScore2 = "";
var hScore3 = "";

var keyPressed = false;
var points = 0;
var level = 1;
var lost = true;
var circle;
var playerCircle;
var user;
var highScore;

init();

function init() {
    if(!JSON.parse(localStorage.getItem('userNameCircleMatch'))) {
      user = prompt("Choose a username: ");
      localStorage.setItem('userNameCircleMatch', JSON.stringify(user));
    } else {
      user = JSON.parse(localStorage.getItem('userNameCircleMatch'));
    }
    ctx.font = "50px Verdana";
    ctx.fillStyle = "#985A41";
    ctx.textAlign = "center";
    ctx.fillText("Circle Match!", 400,250, 500);
    ctx.font = "30px Verdana";
    ctx.fillStyle = "#D1A588"
    ctx.fillText("Use spacebar to match the circles!", 400, 350, 700);
    ctx.font = "20px Verdana";
    ctx.fillText("Press return to start the game!", 400, 400, 500);
    ctx.fillStyle = "#ffffff";

    if(!JSON.parse(localStorage.getItem('highScoreCircleMatch'))){
      highScore = "No highscore"
    } else {
      highScore = JSON.parse(localStorage.getItem('highScoreCircleMatch'));
    }

    ctxHigh.font = "18px Verdana";
    ctxHigh.fillStyle = "#ffffff";
    ctxHigh.textAlign = "center";
    ctxHigh.fillText("Highscore:", 100,250, 500);
    ctxHigh.fillText(user + " - " + highScore, 100,300, 500);
}

generateNewCircles(level);

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
    level = 1;
    lost = false;
    generateNewCircles(level);
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
    if(points >= 3 && level == 1) {
      level = 2;
      levelSound.play();
    }if(points >= 10 && level == 2) {
      level = 3;
      levelSound.play();
    }if(points >= 15 && level == 3) {
      level = 4;
      levelSound.play();
    }if(points >= 20 && level == 4) {
      level = 5;
      levelSound.play();
    }if(points >= 25 && level == 5) {
      level = 6;
      levelSound.play();
    }if(points >= 30 && level == 6) {
      level = "ELITE!";
      levelSound.play();
    }
    generateNewCircles(level);
    scoreSound.play();
  }
   else {
     youLoose();
     gameOverSound.play();
   }
}

//generate new circles
function generateNewCircles(level) {
  if(level == 1){
    circle = new Circle(400, 300, 70, 50, 1, c.width, c.height);
    playerCircle = new Circle(400, 300, 140, 5, 1, c.width, c.height);
  }
  if(level == 2){
    circle = new Circle(400, 300, randRadius(10, 100), 50, 1.5, c.width, c.height);
    playerCircle = new Circle(400, 300, randRadius((circle.getRadius()+50),150), 5, 1.5, c.width, c.height);
  }
  if(level == 3){
    circle = new Circle(400, 300, randRadius(10, 100), randLineWidth(50,5), 1.5, c.width, c.height);
    playerCircle = new Circle(400, 300, randRadius((circle.getRadius()+50),150), 5, 1.5, c.width, c.height);
  }
  if(level == 4){
    randPosX = randPos();
    randPosY = randPos();
    circle = new Circle(randPosX, randPosY, randRadius(10, 100), randLineWidth(50,5), 1.5, c.width, c.height);
    playerCircle = new Circle(randPosX, randPosY, randRadius((circle.getRadius()+50),150), 5, 1.5, c.width, c.height);
  }
  if(level == 5){
    randPosX = randPos();
    randPosY = randPos();
    circle = new Circle(randPosX, randPosY, randRadius(10, 100), randLineWidth(50,5), 1.75, c.width, c.height);
    playerCircle = new Circle(randPosX, randPosY, randRadius((circle.getRadius()+50),150), 5, 1.75, c.width, c.height);
  }
  if(level == 6){
    randPosX = randPos();
    randPosY = randPos();
    circle = new Circle(randPosX, randPosY, randRadius(10, 100), randLineWidth(50,5), 2, c.width, c.height);
    playerCircle = new Circle(randPosX, randPosY, randRadius((circle.getRadius()+50),150), 5, 2, c.width, c.height);
  }
  if(level == "ELITE!"){
    randPosX = randPos();
    randPosY = randPos();
    circle = new Circle(randPosX, randPosY, randRadius(10, 100), randLineWidth(50,5), 2.5, c.width, c.height);
    playerCircle = new Circle(randPosX, randPosY, randRadius((circle.getRadius()+50),150), 5, 2.5, c.width, c.height);
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
  checkHighscore(points);
}

//check the highscore
function checkHighscore(points) {
  if(!JSON.parse(localStorage.getItem('highScoreCircleMatch'))){
    localStorage.setItem('highScoreCircleMatch', JSON.stringify(points));
  } else {
    highScore = JSON.parse(localStorage.getItem('highScoreCircleMatch'));
    if(highScore <= points){
      localStorage.setItem('highScoreCircleMatch', JSON.stringify(points));
    }
  }

  ctxHigh.clearRect(0, 0, cHigh.width, cHigh.height);
  ctxHigh.font = "18px Verdana";
  ctxHigh.fillStyle = "#ffffff";
  ctxHigh.textAlign = "center";
  ctxHigh.fillText("Highscore:", 100,250, 500);
  ctxHigh.fillText(JSON.parse(localStorage.getItem('userNameCircleMatch')) + " - " + JSON.parse(localStorage.getItem('highScoreCircleMatch')), 100,300, 500);
}
