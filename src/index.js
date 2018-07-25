// Twitter Bot Workshop

require("dotenv").config();

const Twit = require('twit');
const request = require("request");

const keys = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000
};

const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&key=123456&format=text&lang=en';

const bot = new Twit(keys);

function getQuote(callback) {
  request(apiUrl, (err, res, body) => {
    if (err) errorHandler(err);
    const tweet = err ? 'Hubo un error con este bot. Bip bop bip.' : body;
    callback(tweet);
  });
};

function postTweet(tweet) {

  const status = tweet;
  bot.post('statuses/update', { status }, (err, data, res) => {
    if (err) errorHandler(err);
  });
}

function errorHandler(err) {
  console.log(err)
}

getQuote(postTweet);
