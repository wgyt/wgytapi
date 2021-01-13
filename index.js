/* WGYTAPI */

/* SETUP */

/* Set up EXPRESS JS*/
const express = require('express');
const expressapp = express()
expressapp.listen(3000, () => {
	console.clear()
  console.log('hi, the server is started')
	console.log("👍")
});

/* Set up Prompt */
const prompt = require('prompt-sync')();

/* Set up rate limiting */
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({windowMs: 2 * 60 * 1000, max: 90});
expressapp.use(limiter); // apply to all requests

/* Set up fs-extra */
const fsextra = require('fs-extra') // This uses fs-extra not fs
/* Set Up fetch */
const fetch = require('node-fetch');
/* Set Up json merge */
var jsonMerger = require("json-merger");
/* Set up variables */
const version = "1.3.3WEB" // <<<< VERSION GOES THERE
const tokenlist = "*"// process.env.PUBLIC // or private

/* Define functions */
function scratchApiUser(user){
	jeffaloapi=`https://my-ocular.jeffalo.net/api/user/${user}`
	leftymainapi=`https://scratchdb.lefty.one/v2/user/info/${user}/`
	leftyprojapi=`https://scratchdb.lefty.one/v2/project/info/user/${user}/`
	leftyforumapi=`https://scratchdb.lefty.one/v2/forum/user/info/${user}/`
	leftypostapi=`https://scratchdb.lefty.one/v2/forum/user/posts/${user}/`
	// Make files
	fsextra.ensureFile(`scratch/jeffalo${user}.json`, err => {})	
	fsextra.ensureFile(`scratch/leftymain${user}.json`, err => {})
	fsextra.ensureFile(`scratch/leftyproj${user}.json`, err => {})
	fsextra.ensureFile(`scratch/leftyforum${user}.json`, err => {})
	fsextra.ensureFile(`scratch/leftypost${user}.json`, err => {})
	fsextra.ensureFile(`scratch/${user}.json`, err => {})
	// GET SCRATCH DATA
	// TODO: SAVE JSON DATA
	fetch(jeffaloapi)
    .then(res => res.json())
    .then(json => console.log(json));
	fetch(leftymainapi)
    .then(res => res.json())
    .then(json => console.log(json));
	fetch(leftyprojapi)
    .then(res => res.json())
    .then(json => console.log(json));
	fetch(leftyforumapi)
    .then(res => res.json())
    .then(json => console.log(json));
	fetch(leftypostapi)
    .then(res => res.json())
    .then(json => console.log(json));
	// merge json files
	var result = jsonMerger.mergeFiles([`scratch/jeffalo${user}.json`, `scratch/leftymain${user}.json`,`scratch/leftyproj${user}.json`,`scratch/leftyforum${user}.json`,`scratch/leftypost${user}.json`]);
	fsextra.writeJson(`scratch/${user}.json`, result, err => {
		if (err) return console.error(err)
	})
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
  res.redirect(301,'https://documentation.wgyt.tk/apiwgyttk')
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
		scratchApiUser(username)
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