const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.all('*', (req, res) => {
  res.sendFile('/', {root: 'dist'});
});


app.listen(() => console.log(process.env.PORT || 3025, "listening on port"));
