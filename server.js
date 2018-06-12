const express = require('express');
const app = express();
app.use(express.static('public'));


app.get('/', function(req, res) {
    res.sendFile(_dirname + './public/index.html')
});

app.listen(process.env.PORT || 8080);

module.exports = { app };