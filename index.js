/**
 * Created by tmq on 02/05/2017.
 */

var express = require('express');
var app = express();

app.use(express.static('public'));

app.listen(3000, () => {
   console.log('Server is started');
});

