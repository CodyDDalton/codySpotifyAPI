const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const querystring = require('querystring');

const encodeData = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

router.get('/login', async (req, res) => {
    const scope =
      `user-modify-playback-state
      user-read-playback-state
      user-read-currently-playing
      user-library-modify
      user-library-read
      user-top-read
      playlist-read-private
      playlist-modify-public`;
  
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: process.env.REDIRECT,
        grant_type:'client_credentials'
      })
    );
  });

  router.get('/success', async (req, res) => {
    const body = {
      grant_type: 'authorization_code',
      code: req.query.code,
      redirect_uri: process.env.REDIRECT,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    }
  
    await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      },
      body: encodeData(body)
    })
    .then(response => response.json())
    .then(data => {
      const query = querystring.stringify(data);
      console.log(data)
      res.redirect(`${process.env.CLIENT_REDIRECT}?${query}`);
    });
  });

module.exports = router;