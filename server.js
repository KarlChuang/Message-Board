const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const data = {
  Messages: [
    {
      name: 'Karl Chuang',
      time: "2017-5-8 15:01",
      content: 'Welcome to Message Board!!!',
      reply: [
        {
          name: 'Karl Chuang',
          time: "2017-5-8 15:01",
          content: 'You can add a new message by clicking add button below. ⬇︎',
          reply: [],
        },
        {
          name: 'Karl Chuang',
          time: "2017-5-8 15:01",
          content: 'You can also reply other people\'s messages by click reply button. ➡',
          reply: [
            {
              name: 'Karl Chuang',
              time: "2017-5-8 15:01",
              content: 'The maximum number of reply layers is 5.',
              reply: [],
            },
            {
              name: 'Karl Chuang',
              time: "2017-5-8 15:01",
              content: 'On the fifth layer, the message board will add new reply at the same layer.',
              reply: [],
            },
          ],
        },
      ],
    },
    {
      name: 'Karl Chuang',
      time: "2017-5-8 15:01",
      content: 'Enjoy it!!!',
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
