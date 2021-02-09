require('dotenv').config();
const express = require('express'),
api = require('./server/routes/api'),
sequelize = require('sequelize'),
path = require('path'),
app = express(),
PORT = process.env.PORT || 5000,
URI = process.env.CLEARDB_PURPLE_URL,
API_PATH = require('./src/Constants').API_PATH;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('node_modules'));
app.use(express.static('build'));
app.use(API_PATH, api);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

new sequelize(URI)
.authenticate()
.then (() => {
    app.listen(PORT, () => {
        console.log(`Server is up and running on port: ${PORT}`);
    });
})
.catch(err => {
    console.log(err.message);
});