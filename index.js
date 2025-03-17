const express = require('express');
const dbConn = require('./config/dbConnection');
dbConn();

process.env.config;

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000
app.listen( (port), ()=> {
    console.log(`Server live on PORT ${port}`)
})

const user = require('./routes/route')
app.use('/api/v1/', user);

app.use('/', (req, res)=> {
    res.send("<h1>Default route </h1>")
})
