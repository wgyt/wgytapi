/* WGYTAPI */

/* SETUP */

/* Set up EXPRESS JS */
const express = require('express')
const expressapp = express()
expressapp.listen(3000, () => {
  console.clear()
  console.log('hi, the server is started')
  console.log('👍')
})

/* Set up fs-extra */
const fsextra = require('fs-extra') // This uses fs-extra not fs
/* Set Up request */
const request = require('request')
/* Set up variables */
const version = '1.3.3WEB' // <<<< VERSION GOES THERE
const tokenlist = '*'// process.env.PUBLIC or private

/* Define functions */
function scratchApiUser (user) {
  fsextra.ensureFile(`scratch/jeffalo/${user}.json`)
    .then(() => {
      console.log('success!')
    })
    .catch(err => {
      console.error(err)
    })
  fsextra.ensureFile(`scratch/lefty/${user}.json`)
    .then(() => {
      console.log('success!')
    })
    .catch(err => {
      console.error(err)
    })
  jeffaloapi = `https://my-ocular.jeffalo.net/api/user/${user}`
  leftymainapi = `https://scratchdb.lefty.one/v2/user/info/${user}/`
  request(jeffaloapi, {
    json: true
  }, (error, res, body) => {
    if (error) {
      return console.log(error)
    };
    if (!error && res.statusCode == 200) {
      console.log(body)
      fsextra.writeJson(`scratch/jeffalo/${user}.json`, {
        color: body.color,
        status: body.status,
        name: body.name
      }, err => {
        if (err) return console.error(err)
        console.log('success!')
      })
    };
  })
  request(leftymainapi, {
    json: true
  }, (error, res, body) => {
    if (error) {
      return console.log(error)
    };
    if (!error && res.statusCode == 200) {
      console.log(body)
      fsextra.writeJson(`scratch/lefty/${user}.json`, {
        username: body.username,
        id: body.id,
        joined: body.joined,
        followers: body.followers,
        following: body.following,
        country: body.country,
        bio: body.bio,
        work: body.work,
        type: body.status
      }, err => {
        if (err) return console.error(err)
        console.log('success!')
      })
    };
  })
  // todo: merge data into one MEGA JSON FILE™
}

/* API SITES */
expressapp.all('/', (req, res) => {
  const token = req.query.token
  const user_name = req.query.username
  res.status(200).json({
    path: '/',
    token: token,
    user: user_name,
    description: 'Hi there! This is WGYTAPI',
    docs: '/docs',
    version: version
  })
})
expressapp.all('/about', function (req, res) {
  const token = req.query.token
  const user_name = req.query.username
  if (tokenlist.includes(token) === (token.length === 18)) {
    res.status(200).json({
      path: '/about',
      token: token,
      user: user_name,
      description: 'Hi there!',
      version: version
    })
  } else {
    res.status(401).json({
      path: '/about',
      token: token,
      user: user_name,
      description: 'UNAUTHORIZED! Provide a valid token!',
      version: version
    })
  }
})
expressapp.all('/docs', function (req, res) {
  const token = req.query.token
  const user_name = req.query.username
  res.redirect(301, 'https://documentation.wgyt.tk/apiwgyttk')
})
expressapp.all('/scratchsound', function (req, res) {
  const token = req.query.token
  const user_name = req.query.username
  if (tokenlist.includes(token) === (token.length === 18)) {
    res.status(200).json({
      path: '/scratchsound',
      token: token,
      user: user_name,
      description: 'Hi there! This is the ScratchSound API',
      docs: '/./docs',
      version: version
    })
  } else {
    res.status(401).json({
      path: '/scratchsound',
      token: token,
      user: user_name,
      description: 'UNAUTHORIZED! Provide a valid token!',
      version: version
    })
  }
})
expressapp.all('/scratchsound/song/all', function (req, res) {
  const token = req.query.token
  const user_name = req.query.username
  if (tokenlist.includes(token) === (token.length === 18)) {
    res.status(200).json({
      path: '/scratchsound',
      token: token,
      user: user_name,
      description: 'This returns the Song list',
      Data: '',
      docs: '/./docs',
      version: version
    })
  } else {
    res.status(401).json({
      path: '/scratchsound',
      token: token,
      user: user_name,
      description: 'UNAUTHORIZED! Provide a valid token!',
      version: version
    })
  }
})
expressapp.all('/scratch', function (req, res) {
  const token = req.query.token
  const username = req.query.username
  if (tokenlist.includes(token) === (token.length === 18)) {
    // Get data about user
    scratchApiUser(username)
    // Serve Data
    res.status(200).json({
      path: '/scratch',
      token: token,
      user: username,
      description: 'Hi there! This is the Scratch API',
      Data: '',
      docs: '/./docs',
      version: version
    })
  } else {
    res.status(401).json({
      path: '/scratch',
      token: token,
      user: username,
      description: 'UNAUTHORIZED! Provide a valid token!',
      version: version
    })
  }
})
