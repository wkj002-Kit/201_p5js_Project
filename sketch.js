/*
 * This program sketch is copied from Even Peck's example at
 * https://editor.p5js.org/evanpeck/sketches/O7MjzPFxb
 * This is from my own learning.
 * Kit Jackson
 * 12/2022
 * This program runs at the following link:
 * https://wkj002-kit.github.io/201_p5js_project/
 *
 * Revisions
 * 1. Changed shape of balls to be ovals and changed code so 
 *    they still bounce correctly off the walls
 * 2. Changed background color
 * 3. Changed most attributes of balls to be constant
 * 4. Changed color to alternate between bucknell orange and blue
 *    after it hits a wall
 * 5. Set the rectangle to be black without being see 
 *    through at all and remain infront of the balls 
 * 6. Created a counter for when the ball hits the wall
 * 7. Displayed counter in rectangle with label
 * 8. Reduced number of balls
 * 9. Removed hit box
 * 10. Changed sound to jazz elevator music
 */

const BOX_WIDTH  = 200;  // textbox dimensions
const BOX_HEIGHT = 100;
const WINDOW_WIDTH = 600;
const WINDOW_HEIGHT = 400;
const BOX_X = (WINDOW_WIDTH - BOX_WIDTH)/2;
const BOX_Y = (WINDOW_HEIGHT - BOX_HEIGHT)/2;

var countT = 0;

var balls = [];
var sound;

function preload() {

  sound = loadSound("ele_music.m4a");  // preload the sound file
}

function setup() {

  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

  noStroke();
  
  sound.loop();  // play the sound file repeatedly
  
  for (var ballNum = 0; ballNum < 5; ballNum++) {
  	balls[ballNum] = new Ball();  
  }
  
}

function createBox() {
  // prepare a box first
  strokeWeight(4);
  fill(0)
  rect((WINDOW_WIDTH - BOX_WIDTH)/2, (WINDOW_HEIGHT - BOX_HEIGHT)/2, BOX_WIDTH, BOX_HEIGHT);
  
  textSize(32);           // size of the text (pixels)
  fill(255);      // fill() takes R,G,B values as the color
  // draw the text in the box (x,y,width,height) with the color in fill()
  textAlign(CENTER);
  text('# of wall hits', BOX_WIDTH/2 + BOX_X, BOX_HEIGHT/2 + BOX_Y/1.1);
  text(countT, BOX_WIDTH/2 + BOX_X, BOX_HEIGHT/2 + BOX_Y*1.2);
 
}

function draw() {

  background(150);

  
  for (var ballNum = 0; ballNum < balls.length; ballNum++) {
    balls[ballNum].display();
    balls[ballNum].checkForHitWall();
    balls[ballNum].moveBall();
    
    if (mouseIsPressed) {
      balls[ballNum].switchDir()
    }
  }
  createBox();
}


class Ball { // Constructor
  
  constructor() {
    // initial position
    this.ballX = random(50, width-width/8)
    this.ballY = random(50, height-height/8)
    
    // Dictates velocity + direction
    this.speedY = 2;
    this.speedX = 1.5;
    
    // How transparent the ball is
    this.alpha = 200
    
    // RGB values for color
    this.red   = 0;
    this.green = 56;
    this.blue  = 101;
    
    // Hit Counter
    this.count = 0;
  }
  
  display() {
    fill(this.red, this.green, this.blue, this.alpha);
    ellipse(this.ballX, this.ballY, 80, 50);
  }
  
  switchDir() {
    this.speedX = -this.speedX;
  }
  
  checkForHitWall() {
  
    let radius = 40;
    if ((this.ballY+25) > height || (this.ballY-25) < 0) {
  	  this.speedY = -this.speedY;
      this.count ++;
      countT++;
      this.colorChange();
  	}
    if ((this.ballX+40) > width  || (this.ballX-40) < 0) {
      this.speedX = -this.speedX;
      this.count ++;
      countT++;
      this.colorChange();
    }
  }
  
  reverseBall() {
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;    
  }
  
  colorChange(){
    if (this.count%2 == 0){
      this.red = 0;
      this.green = 56;
      this.blue = 101;
    }
    else{
      this.red = 232;
      this.green = 119;
      this.blue = 34;
    }
  }
  
  moveBall() {
    this.ballX += this.speedX;
  	this.ballY += this.speedY;
  }
  
}
