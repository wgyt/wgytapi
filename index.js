/* WGYTAPI */

/* SETUP */

/* Set up EXPRESS JS*/
const express = require('express');
const expressapp = express()

/* Set up Prompt */
const prompt = require('prompt-sync')();

/* Set up rate limiting */
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({windowMs: 2 * 60 * 1000, max: 90});
expressapp.use(limiter); // apply to all requests

/* Set up fs-extra */
const fsextra = require('fs-extra') // This uses fs-extra not fs

/* Set up variables */
const version = prompt('What version');
const tokenlist = process.env.PUBLIC // or private


expressapp.listen(3000, () => {
  console.clear()
  console.log('hi, the server is started')
	console.log("Version is:")
	console.log(version)
});

/* Define functions */
function scratchApi(user){
	// GET SCRATCH DATA
	return console.log(user)
}

/* API SITES */
expressapp.all('/', (req, res) => {
  var token = req.query.token;
  var user_name = req.query.username;
  res.status(200).json({
    "path": "/",
    "token": token,
    "user": user_name,
    "description": "Hi there! This is WGYTAPI",
    "docs": "/docs",
		"version" : version
  })
});
expressapp.all('/about', function(req, res) {
  var token = req.query.token;
  var user_name = req.query.username;
  if (tokenlist.includes(token) === (token.length === 18)) {
    res.status(200).json({
      "path": "/about",
      "token": token,
      "user": user_name,
      "description": "Hi there!",
			"version" : version
    })
  } else {
    res.status(401).json({
      "path": "/about",
      "token": token,
      "user": user_name,
      "description": "UNAUTHORIZED! Provide a valid token!",
			"version" : version
    })
  }
});
expressapp.all('/docs', function(req, res) {
  var token = req.query.token;
  var user_name = req.query.username;
  res.redirect(301,
    'https://github.com/wgyt735yt/wgytapi/wiki' +
    req.path)
});
expressapp.all('/scratchsound', function(req, res) {
  var token = req.query.token;
  var user_name = req.query.username;
  if (tokenlist.includes(token) === (token.length === 18)) {
    res.status(200).json({
      "path": "/scratchsound",
      "token": token,
      "user": user_name,
      "description": "Hi there! This is the ScratchSound API",
      "docs": "/./docs",
			"version" : version
    })
  } else {
    res.status(401).json({
      "path": "/scratchsound",
      "token": token,
      "user": user_name,
      "description": "UNAUTHORIZED! Provide a valid token!",
			"version" : version
    })
  }
});
expressapp.all('/scratchsound/song/all', function(req, res) {
  var token = req.query.token;
  var user_name = req.query.username;
  if (tokenlist.includes(token) === (token.length === 18)) {
    res.status(200).json({
      "path": "/scratchsound",
      "token": token,
      "user": user_name,
      "description": "This returns the Song list",
			"Data" : "",
      "docs": "/./docs",
			"version" : version
    })
  } else {
    res.status(401).json({
      "path": "/scratchsound",
      "token": token,
      "user": user_name,
      "description": "UNAUTHORIZED! Provide a valid token!",
			"version" : version
    })
  }
});
expressapp.all('/scratch', function(req, res) {
  var token = req.query.token;
  var username = req.query.username;
  if (tokenlist.includes(token) === (token.length === 18)) {
    // Get data about user
		scratchApi(username)
		// Serve Data
		res.status(200).json({
      "path": "/scratch",
      "token": token,
      "user": username,
      "description": "Hi there! This is the Scratch API",
			"Data" : "",
      "docs": "/./docs",
			"version" : version
			})
  } else {
    res.status(401).json({
      "path": "/scratch",
      "token": token,
      "user": username,
      "description": "UNAUTHORIZED! Provide a valid token!",
			"version" : version
    })
  }
});