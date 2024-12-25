const port = process.env.PORT || 9000;
const path = require('path');

const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())

app.use(express.static(path.join(__dirname, 'build')));

// ------------------------------
app.use('/users', require('./routes/userRoute'))

app.use('/managers', require('./routes/managerRoute'))

app.use('/signin', require('./routes/signInUserRoute'))
// ------------------------------

app.use(cors({
    origin: ["https://users-app-frontend-phi.vercel.app"],
    methods: ["POST", "GET", "PATCH"]
  }));

app.listen(port, () => {
    console.log(`App is listening on dd ${port}`)
})
