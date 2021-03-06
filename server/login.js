const db = require('../db/index.js');
const app = require('./index.js');
const login = require('express').Router();
const util = require('./helpers/utilities.js');

login.post('/login', function(req, res) {
  //send auth query to DB
  //if affirmed redirect to '/jobs'
  let query = {
    email: req.body.email,
    password: req.body.password
  };

  // Eventually, we should have server side form validation before talking to DB,
  // because DB transaction is sort of expensive
  db.login(query, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      if (data.messageCode === 104 || data.messageCode === 103) {
        res.json(data);
      } else {
        util.createSession(req, res, data); //<- send something to indicate/initiate 'session' state change
      }
    }
  });
});

module.exports = login;
