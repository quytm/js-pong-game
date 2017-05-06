/**
 * Created by tmq on 01/05/2017.
 */

// Update game objects
var update = function (modifier) {

    if (32 in keysDown) { // Start the game with the spacebar
        isGameStarted = true;
    }

    if (!isGameStarted) {
        return false;
    }

    if (65 in keysDown) { // P1 holding left (key: a)
        if (p1.x > 0) {
            // Update position
            var movementXaxis = p1.speed * modifier;
            p1.x -= movementXaxis;

            p1.updatePivot();
            p1.updatePoints(movementXaxis * -1);

            // go back on track, just in case it went too out of boundaries
            if (p1.x <= 0) {
                p1.x = 0;
            }
        }
    }

    if (68 in keysDown) { // P1 holding right (key: d)
        if (p1.x + p1.width < canvas.width) {
            // Update position
            var movementXaxis = p1.speed * modifier;
            p1.x += movementXaxis;

            p1.updatePivot();
            p1.updatePoints(movementXaxis);

            // go back on track, just in case it went too out of boundaries
            if (p1.x + p1.width > canvas.width) {
                p1.x = canvas.width - p1.width;
            }
        }
    }

    if (37 in keysDown) { // P2 holding left
        if (p2.x > 0) {
            // Update position
            var movementXaxis = p2.speed * modifier;
            p2.x -= movementXaxis;

            p2.updatePivot();
            p2.updatePoints(movementXaxis * -1);

            // go back on track, just in case it went too out of boundaries
            if (p2.x <= 0) {
                p2.x = 0;
            }
        }
    }

    if (39 in keysDown) { // P2 holding right
        if (p2.x + p2.width < canvas.width) {
            // Update position
            var movementXaxis = p2.speed * modifier;
            p2.x += movementXaxis;

            p2.updatePivot();
            p2.updatePoints(movementXaxis);

            // go back on track, just in case it went too out of boundaries
            if (p2.x + p2.width > canvas.width) {
                p2.x = canvas.width - p2.width;
            }
        }
    }

    // Ball is out of the top boundary - player 2 wins!
    if (ball.y <= 0) {
        p2.score++;
        reset();
    }

    // Ball is out of the bottom boundary - player 1 wins!
    if (ball.y >= canvas.height - ball.size) {
        p1.score++;
        reset();
    }

    // Ball is colliding with P1
    if (
        ball.y <= (p1.y + p1.height)
        && p1.y <= (ball.y + ball.size)
        && ball.x <= (p1.x + p1.width)
        && p1.x <= (ball.x + ball.size)
    ) {
        // First of all, I need to calculate the wall normal properly.
        // I start by getting the A and B points:
        var a = p1.points[2].clone(),
            b = p1.points[3].clone();

        // Then I get the directing vector:
        p1.direction = b.subSelf(a).normalize();

        // Finally I reflect the ball
        ball.deflect(p1.direction);

        // go back on track, just in case it went too out of boundaries
        ball.y = p1.y + p1.height + 1;
    }

    // Ball is colliding with P2
    if (
        ball.y <= (p2.y + p2.height)
        && p2.y <= (ball.y + ball.size)
        && ball.x <= (p2.x + p2.width)
        && p2.x <= (ball.x + ball.size)
    ) {
        // First of all, I need to calculate the wall normal properly.
        // I start by getting the A and B points:
        var a = p2.points[0].clone(),
            b = p2.points[1].clone();

        // Then I get the directing vector
        p2.direction = b.subSelf(a).normalize();

        // Finally I reflect the ball
        ball.deflect(p2.direction);

        // go back on track, just in case it went too out of boundaries
        ball.y = p2.y - ball.size - 1;
    }

    // Ball is colliding with the left
    if (ball.x <= 0) {
        ball.deflect(new Vector2(0, 1));

        // go back on track, just in case it went too out of boundaries
        ball.x = 0.1;
    }

    // Ball is colliding with the right
    if (ball.x + ball.size >= canvas.width) {
        ball.deflect(new Vector2(0, 1));

        // go back on track, just in case it went too out of boundaries
        ball.x = canvas.width - ball.size - 1;
    }

    // Ball movement
    if (typePlayer === 1) {
        ball.x += ball.velocity.x * modifier;
        ball.y += ball.velocity.y * modifier;
    }

    if (typePlayer === 1) {
        socket.emit('update', {
            ball: {
                x: ball.x,
                y: ball.y
            },
            p1: {
                x: p1.x,
                y: p1.y
            }
        })
    } else if (typePlayer === 2) {
        console.log('emit from 2');
        socket.emit('update', {
            p2: {
                x: p2.x,
                y: p2.y
            }
        })
    }

};
