const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { default: mongoose } = require('mongoose');
const PORT = process.env.PORT || 5000;
const userRoutes = require('./routes/user');
const todoRoutes = require('./routes/todo');
const seedAdmin = require('./seeder/adminSeed');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

mongoose.connect(process.env.MONGO_URL).then(() => console.log("MongoDB is connected")).catch((err) => console.log(err))

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to backend</h1>`)
})

app.use('/users', userRoutes);
app.use('/todos', todoRoutes);


app.listen(PORT, async () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
    await seedAdmin()
})