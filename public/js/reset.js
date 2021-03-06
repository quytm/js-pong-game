/**
 * Created by tmq on 01/05/2017.
 */

// Reset the game
var reset = function () {

    isGameStarted = false;

    var yPosition = (p1.height),
        xPosition = (canvas.width - ball.size) / 2,
        xVelocity = Math.random() > 0.5 ? ball.speed : -ball.speed, // randomly start from left or right
        yVelocity = Math.random() > 0.5 ? ball.speed : -ball.speed; // randomly start from top or bottom

    ball.pos = new Vector2(xPosition, yPosition);
    ball.velocity = new Vector2(xVelocity, yVelocity);
    socket.emit('ball_state', {
        yPosition: ball.pos.y,
        xPosition: ball.pos.x,
        xVelocity: ball.velocity.x,
        yVelocity: ball.velocity.y
    });

    p1.pos.set(xPositionP1, yPositionP1);
    p2.pos.set(xPositionP2, yPositionP2);

    // Set points of paddles
    // Points are set in this order: topLeft, topRight, bottomRight, bottomLeft
    p1.resetPoints();
    p2.resetPoints();

    // p1.pivot.set(p1.width / 2, p1.height / 2).addSelf(p1.pos);
    // p2.pivot.set(p2.width / 2, p2.height / 2).addSelf(p2.pos);
    p1.updatePivot();
    p2.updatePivot();

    p1.direction.set(1, 0);
    p2.direction.set(-1, 0);
};
