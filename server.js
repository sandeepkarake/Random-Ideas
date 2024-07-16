const path = require('path')
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;
const connectDB = require('./config/db')

connectDB();
const app = express();
// Static folder
app.use(express.static(path.join(__dirname, 'public')))
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

// cors middleware
app.use(cors({
    origin: [
        'http://localhost:5000',
        'http://localhost:3000'
    ],
    credentials: true,
}))
app.get('/', (req, res) => {
    res.send({ message: 'Welcome to the RandomIdeas API' })
})

const ideasrouter = require('./routes/ideas')
app.use('/api/ideas', ideasrouter)

app.listen(port, () => {
    console.log(`Server listening at port ${port}`)
})