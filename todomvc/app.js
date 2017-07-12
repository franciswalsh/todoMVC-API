const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const models = require('./models')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/static', express.static('static'));

app.get('/', function (req, res) {
    console.log(req.body);
    res.sendFile(__dirname + "/static/index.html");
})
app.get('/api/todos', function(req, res){
  models.ItemsTodo.findAll().then(function(items){
    res.json(items);
  })
})
app.post('/api/todos', function(req, res){
  // let userInput = req.body.userInput
  // console.log(userInput);
  console.log(req.body);
  const newItem = models.ItemsTodo.build({
    title: req.body.title,
    order: req.body.order,
    completed: req.body.completed
  })
  newItem.save().then(function(newItem){
    res.json(newItem);
  })
})
// put routes here
app.get('/api/todos/:id', function(req, res){
  models.ItemsTodo.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(specificItem){
    res.json(specificItem)
  })
})
app.put('/api/todos/:id', function(req, res){
  models.ItemsTodo.update(
    {
      completed: req.body.completed,
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(function(){
    console.log("successful update");
  });
});
app.patch('/api/todos/:id', function(req, res){
  models.ItemsTodo.update(
    {
      completed: req.body.completed,
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(function(){
    console.log("successful update");
  });
});
app.delete('/api/todos/:id', function(req, res){
  models.ItemsTodo.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(req, res){
    console.log("destory entry");
  })
})
app.listen(3000, function () {
    console.log('Express running on http://localhost:3000/.')
});
