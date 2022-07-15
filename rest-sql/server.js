const express = require('express');
const http = require('http');
const morgan = require("morgan");
const cors = require('cors')

const app = express();
const port = 4000;
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())
app.use('/public', express.static('public'))

// routes
const users = require('./routes/users')
const auth = require('./routes/auth')
const posts = require('./routes/posts')
//

app.get('/', function(req, res){
   res.send("Welcome!");
});

app.use('/users', users)
app.use('/auth', auth)
app.use('/posts', posts)

app.use(function(req, res, next) {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

http.createServer(app).listen(port, () => {
  console.log(`Backend api server listening on port ${port}.`);
});
