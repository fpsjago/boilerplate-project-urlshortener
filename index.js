require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }))


app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


const fullUrl = []
const shortUrl = []


app.post('/api/shorturl/', (req, res) => {
  const url = req.body.url
  const index = fullUrl.indexOf(url)

  if (!url.includes("https://") && !url.includes("http://") && !url.includes("www.")) {
    return res.json({ error: 'Invalid url' })
  }

  if (index < 0) {

    fullUrl.push(url)
    shortUrl.push(shortUrl.length)

    return res.json({
      original_url: url,
      short_url: shortUrl.length - 1
    })
  }

  return res.json({
    original_url: url,
    short_url: shortUrl[index]
  })
})

app.get('/api/shorturl/:shorturl', (req, res) => {
  const short = parseInt(req.params.shorturl)

  const foundIndex = shortUrl.indexOf(short)

  if (foundIndex < 0) {
    return res.json({ "error": "Nos short URL found for the given input" })
  }

  res.redirect(fullUrl[foundIndex])
})




app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
