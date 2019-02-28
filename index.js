const http = require('http');
const https = require('https');
const url = require('url');

const port = process.env.PORT || 7000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  let body = '';
  req.on('readable', () => {
    body += req.read() || '';
  });

  req.on('end', () => {
    try {
      body = JSON.parse(body);
    } catch (error) {
      console.log('Unable to parse body');
    }

    res.end(JSON.stringify({
      url: req.url,
      query: url.parse(req.url, true).query,
      method: req.method,
      headers: req.headers,
      body: body,
      httpVersion: req.httpVersion,
      statusCode: req.statusCode,
      statusMessage: req.statusMessage,
      trailers: req.trailers,
      aborted: req.aborted,
      complete: req.complete
    }));
  });
});

server.listen(port, null, () => {
  console.log('Server running');
});

// Prevent Heroku Node App From Sleeping
// setInterval(() => https.get('https://echo-http.herokuapp.com/'), 15 * 60 * 1000); // every 15 minutes