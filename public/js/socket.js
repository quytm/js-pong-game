/**
 * Created by tmq on 02/05/2017.
 */

socket.emit('new_player', playerInfo);

socket.on('active_player', (data) => {
   console.log(`active player: ${JSON.stringify(data)}`);
   typePlayer = data.player;
   console.log('type = ' + data.player);
   if (data.player === 1) {

   } else if (data.player === 2) {

   }
});

socket.on('start_game', () => {
    isGameStarted = true;
    console.log('start game');
});

socket.on('ball_state', (state) => {
    var yPosition = state.yPosition,
        xPosition = state.xPosition,
        xVelocity = state.xVelocity,
        yVelocity = state.yVelocity;

    ball.pos = new Vector2(xPosition, yPosition);
    ball.velocity = new Vector2(xVelocity, yVelocity);
});

socket.on('update', (data) => {
    // Data from player 2
    if (typePlayer === 1) {
        p2.x = data.p2.x;
        p2.y = data.p2.y;
    }
    // Data from player 1
    else if (typePlayer === 2) {
        ball.x = data.ball.x;
        ball.y = data.ball.y;
        p1.x = data.p1.x;
        p1.y = data.p1.y;
    }
});
