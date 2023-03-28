const express = require('express');
const bodyParser = require('body-parser')
const sequelize = require('./database/connection');
const userRoute = require('./routes/userRoute');

const app = express();
const port = process.env.PORT || 3000;

// Define middleware for parsing incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/user', userRoute);

// Start server
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
});

