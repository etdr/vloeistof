const express = require('express');
const path = require('path');

const app = express();

app.enable('trust proxy');
app.use((req, res, next) => {
  if (req.secure) next();
  else res.redirect(301, 'https://' + req.headers.host + req.url);
});

app.use(express.static('./dist/vloeistof'));
//app.server.get('*.*', express.static('dist'))

app.get('*', (req, res) => {
  res.status(200).sendFile('index.html', {root: 'dist/vloeistof'});
});


app.listen(process.env.PORT || 3025, () => console.log("listening on port"));
