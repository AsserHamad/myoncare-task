const express = require('express');
const path = require('path');
const config = require('./config.express');

// An exported function that attaches all the routes to our express app
const appRouter = require('./src/routes/');

const app = express();

config(app);
appRouter(app);

// Defining the path for all non-API related routes
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// The default error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({message: err.message});
});

module.exports = app;
