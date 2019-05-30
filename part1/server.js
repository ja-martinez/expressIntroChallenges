// Challenge 1:
// Create a GET route for "/hello" that returns the response "Hello!".

// Challenge 2:
// Create a POST route for "/create/:name" that returns a json object that looks like this: { "id":1, "name":"the name they pass in the route" }

// Challenge 3:
// Create a GET route for "/" that returns the index.html file.

// Challenge 4:
// Create a GET route for "/verify/:age" that checks if the age is greater than 13. If it is then it sends a 200 status response (for all good). If it is not greater than 13 then send a 403 status code. For more information on what status codes mean refer to this - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status


var express = require('express');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 8000;

app.get('/hello', function(req, res) {
  res.send("Hello!");
});

app.post('/create/:name', function(req, res) {
  let obj = {
    id: 1,
    name: req.params.name,
  }

  res.json(JSON.stringify(obj));
})

app.get('/', function(req, res) {
  let file = fs.readFileSync('./index.html', 'utf8');
  res.send(file);
})

app.get('/verify/:age', function(req, res) {
  if (parseInt(req.params.age) > 13) {
    res.sendStatus(200)
  } else {
    res.sendStatus(403);
  }
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
