/**
 * Created by tmq on 01/05/2017.
 */

// Create connection
var socket = io('http://localhost:3000');
var playerInfo = {name: 'player name'};

// Game objects
var p1 = new Paddle(),
    p2 = new Paddle(),
    ball = new Ball();

var typePlayer = 0;

// Positions of paddles
var yPositionP1 = 0,
    xPositionP1 = canvas.width / 2 - p1.width / 2,
    yPositionP2 = canvas.height - p2.height,
    xPositionP2 = canvas.width / 2 - p2.width / 2;

// Reset points to their initial position.
// Points are set in this order: topLeft, topRight, bottomRight, bottomLeft
p1.resetPoints = function () {
  this.points = [
    new Vector2(xPositionP1, yPositionP1),
    new Vector2(xPositionP1 + p1.width, yPositionP1),
    new Vector2(xPositionP1 + p1.width, yPositionP1 + p1.height),
    new Vector2(xPositionP1, yPositionP1 + p1.height)
  ];
};

p2.resetPoints = function () {
  this.points = [
    new Vector2(xPositionP2, yPositionP2),
    new Vector2(xPositionP2 + p2.width, yPositionP2),
    new Vector2(xPositionP2 + p2.width, yPositionP2 + p2.height),
    new Vector2(xPositionP2, yPositionP2 + p2.height)
  ];
};

p1.bgImage.loaded = false; // custom flag
p1.bgImage.onload = function () {
  this.loaded = true;
};
p1.bgImage.src = "assets/paddleBlue.png";

p2.bgImage.loaded = false; // custom flag
p2.bgImage.onload = function () {
  this.loaded = true;
};
p2.bgImage.src = "assets/paddleRed.png";
