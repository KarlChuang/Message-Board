const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const data = {
  Messages: [
    {
      name: 'Karl',
      time: "2017-5-1 21:30",
      content: 'aaa',
      reply: [
        {
          name: 'Karllllll',
          time: "2017-5-1 21:30",
          content: 'aaa111111',
          reply: [],
        },
      ],
    },
    {
      name: 'Leo',
      time: "2017-5-1 21:35",
      content: 'bbb',
      reply: [],
    },
  ],
};

let TempData = data;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/comments', function (req, res) {
  res.json(TempData);
});

app.post('/api/comments', function(req, res) {
  TempData = JSON.parse(JSON.stringify(req.body));
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
