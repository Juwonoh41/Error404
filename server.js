const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');
const termData = require('./db/diagnostics.json')
const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/feedback', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
);
//Error
app.use(function(req, res, next) {
  var err = new Error('Not Found - from app.js');
  err.status = 404;
  next(err);
});
//api/diagnostics
app.post('/api/diagnostics', function (req, res) {
  res.send('POST request to the homepage')
})

app.get('/diagnostics', (req,res) =>
  res.json(termData)
)

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
