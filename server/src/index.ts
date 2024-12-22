const port = process.env.PORT || 9000;
const path = require('path');

const express = require('express')

const app = express()
app.use(express.json())

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/users', require('./routes/userRoute'))

app.listen(port, () => {
    console.log(`App is listening on dd ${port}`)
})
