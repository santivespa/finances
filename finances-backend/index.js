
const express = require('express');
const { dbConeection } = require('./database/config');
require('dotenv').config(); // Load .env file
const cors = require('cors');

//Create server
const app = express();

app.use(cors());
//Public directory
app.use(express.static('public'));

//Connect to database
dbConeection();

//Body read and parse
app.use(express.json());

//API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/sheets', require('./routes/sheets'));
app.use('/api/sheet-item', require('./routes/sheet-item'));
app.use('/api/category', require('./routes/category'));

//Listen requests
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT }`);
});