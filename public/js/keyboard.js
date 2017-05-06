/**
 * Created by tmq on 01/05/2017.
 */

// Handle keyboard controls
var keysDown = {};
var ROTATION_ANGLE = 5;

addEventListener("keydown", function (e) {
    if (typePlayer === 0) return;

    if (e.keyCode == 65) { // P1 pressed left (key: a)
        if (!keysDown[65]) { // execute only the first time
            p1.angle = ROTATION_ANGLE;
            p1.rotatePoints(p1.angle);
        }
    }

    if (e.keyCode == 68) { // P1 pressed right (key: d)
        if (!keysDown[68]) { // execute only the first time
            p1.angle = -ROTATION_ANGLE;
            p1.rotatePoints(p1.angle);
        }
    }

    if (e.keyCode == 37) { // P2 pressed left (key: arrow left)
        if (!keysDown[37]) { // execute only the first time
            p2.angle = -ROTATION_ANGLE;
            p2.rotatePoints(p2.angle);
        }
    }

    if (e.keyCode == 39) { // P2 pressed right (key: arrow right)
        if (!keysDown[39]) { // execute only the first time
            p2.angle = ROTATION_ANGLE;
            p2.rotatePoints(p2.angle);
        }
    }

    keysDown[e.keyCode] = true;

}, false);

addEventListener("keyup", function (e) {
    if (typePlayer === 0) return;

    if (e.keyCode == 65) { // P1 released left (key: a)
        p1.angle = 0;
        p1.realignPoints();
    }

    if (e.keyCode == 68) { // P1 released right (key: d)
        p1.angle = 0;
        p1.realignPoints();
    }

    if (e.keyCode == 37) { // P2 released left (key: arrow left)
        p2.angle = 0;
        p2.realignPoints();
    }

    if (e.keyCode == 39) { // P2 released right (key: arrow right)
        p2.angle = 0;
        p2.realignPoints();
    }

    delete keysDown[e.keyCode];

}, false);
