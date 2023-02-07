const express = require ('express');
const app = express ();
const cors = require ('cors');
const db = require ('./models');
const bodyParser = require ('body-parser');
require ('dotenv').config ();

const PORT = process.env.PORT || 5000;

app.use (cors ());
app.use (function (req, res, next) {
  res.header ('Access-Control-Allow-Origin', '*');
  res.header ('Access-Control-Allow-Headers', 'X-Requested-With');
  next ();
});

app.use (bodyParser.urlencoded ({extended: true}));
app.use (bodyParser.json ());

require ('./routes/user.routes') (app);
require ('./routes/quiz.routes') (app);
db.mongoose.set ('strictQuery', true);

db.mongoose
  .connect (process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then (() => {
    console.log ('db connected: ', process.env.MONGO_URI);
  })
  .catch (err => {
    console.log (err);
  });

app.listen (PORT, () => {
  console.log ('Server started on port ' + PORT);
});
