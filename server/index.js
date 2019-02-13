const express = require('express');

require('dotenv').config();

const PORT = process.env.PORT || 8888;

const app = express();

app.listen(PORT, function() {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Server up and running...🏃🏃🏻');
    console.log(`Listening on http://localhost:${PORT}/ \n`);
  }
});

app.get('/', function() {
  res.send('Hi from the server');
});
