/**
 * Created by tmq on 02/05/2017.
 */
'use strict';

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

server.listen(3000, function () {
    console.log('listening on *:' + 3000);
});


// -------------------------- Socket -----------------------------------------------------------------------------------

const TYPE_P1 = 1,
    TYPE_P2 = 2,
    TYPE_GUEST = 0;

var p1 = {},
    p2 = {};

var numberPlayer = 0;
var isPlaying = false;


io.on('connection', function (socket) {
    let typePlayer = TYPE_GUEST;

    socket.on("new_player", (data) => {
        if (numberPlayer === 0) {
            typePlayer = TYPE_P1;
            socket.emit('active_player', {player: typePlayer});
            p1 = data;
        } else if (numberPlayer === 1) {
            typePlayer = TYPE_P2;
            socket.emit('active_player', {player: typePlayer});
            p2 = data;
            isPlaying = true;

            // setTimeout(function() {
            //     io.sockets.emit('start_game');
            //
            // }, 3000);

        } else {
            typePlayer = TYPE_GUEST;
            console.log('guest');
        }

        numberPlayer++;
    });

    socket.on('disconnect', () => {
       console.log('disconnect\nNumber client = ' + --numberPlayer);
    });

    socket.on('ball_state', (state) => {
        socket.broadcast.emit('ball_state', state);
    });

    socket.on('update', (data) => {
        socket.broadcast.emit('update', data);
    });
});