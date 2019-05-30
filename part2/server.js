// Challenge 1:
// Create a POST route for "/create/:name/:age" that creates an object that looks like this: { "name": "troy", "age": 21 } Then take that object and insert it into storage.json

// Challenge 2:
// Create a Get route for "/" that returns all of the objects inside storage.json.

// Challenge 3:
// Create a Get route for "/:name" that returns the first object in storage.json that matches the name. If there is no object in storage.json that matches then return a 400 status.

var express = require('express');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 8000;

app.post('/create/:name/:age', function(req, res) {
  const {name, age} = req.params;
  let obj = {
    'name': name,
    'age': age,
  }

  let file = fs.readFileSync('./storage.json', 'utf8');
  let data = JSON.parse(file);

  data.push(obj);
  fs.writeFileSync('./storage.json', JSON.stringify(data));

  res.sendStatus(200);
})

app.get('/', function(req, res) {
  let file = fs.readFileSync('./storage.json', 'utf8');
  res.json(file);
});

app.get('/:name', function(req, res) {
  let file = fs.readFileSync('./storage.json', 'utf8');
  const data = JSON.parse(file);
  let found = false;

  for (let obj of data) {
    if (obj.name === req.params.name) {
      found = true;
    }
    if (found === true) {
      res.json(JSON.stringify(obj));
    } else {
      res.sendStatus(400)
    }
  }
  
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
