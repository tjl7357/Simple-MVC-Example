// import libraries
const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const router = require('./router.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Connect to Mongoose
const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/simpleMVCExample';
mongoose.connect(dbURI).catch(err => {
  if (err) {
    console.log('Could not Connect to Database');
    throw err;
  }
});

const app = express();

app.use('/assets', express.static(path.resolve(`${__dirname}/../client/`)));

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: '',
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);

app.use(favicon(`${__dirname}/../client/img/favicon.png`));

router(app);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});

