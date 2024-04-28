const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.set('view engine', 'ejs');

const routes = require('./src/routes/index');
app.use(routes);

app.listen(PORT, () => {
    console.log(`App Berjalan di PORT: `+ PORT);
})