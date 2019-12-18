const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/vloeistof'));
//app.server.get('*.*', express.static('dist'))

app.get('*', (req, res) => {
  res.status(200).sendFile('index.html', {root: 'dist/vloeistof'});
});


app.listen(3025, () => console.log("listening on port"));
