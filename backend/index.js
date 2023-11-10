const express = require('express');
const app = express();
const PORT = process.env.PORT || 3550
const cookieParser = require('cookie-parser')
const cors = require('cors');
const credentials = require('./middlewares/credentials');

app.use(credentials)
app.use(cors(require('./config/corsOptions')));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false, limit: '5mb', parameterLimit: 50000 }));


app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/auth'))


app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to HireX API" })
})


app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))