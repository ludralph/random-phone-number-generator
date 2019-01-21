const express = require('express');
const bodyParser = require('body-parser');
const cors  = require('cors')
const routes = require('./routes');

const app = new express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

app.get('/', (req, res) => {
  const welcomeMessage = `Welcome to the random phone number generator app`;
  res.status(200).json({
    message: welcomeMessage,
  });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

// error handlers
app.use((err, req, res) => {
  res.status(err.status || 500);
  return res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {},
  });
});

module.exports = app;
