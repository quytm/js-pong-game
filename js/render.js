/**
 * Created by tmq on 01/05/2017.
 */

// Draw everything
var render = function () {

  // Draw the background image
  ctx.fillStyle = bgPattern;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ball
  if (ballBgImage.loaded) {
    ctx.drawImage(ballBgImage, ball.x, ball.y);
  }

  p1.render();
  p2.render();

  // Text options
  ctx.font = "18px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  // P1 Score
    ctx.fillStyle = "rgb(0, 0, 250)";
  ctx.fillText(p1.score, 32, 32);
    // P2 Score
    ctx.fillStyle = "rgb(86, 15, 15)";
    ctx.fillText(p2.score, 32, canvas.height - 32 - 10);
  // Text options
  ctx.font = "36px Helvetica";

  // Initial text
    ctx.fillStyle = "rgb(250, 250, 250)";
    if (!isGameStarted) {
    ctx.fillText("Press spacebar to start", 25, canvas.height / 2);
  }
};
