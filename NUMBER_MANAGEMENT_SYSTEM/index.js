const express = require('express');
const app  = express();
const PORT = process.env.PORT|| 8008;

app.listen(PORT , ()=>{ console.log(`Number Management service is running at port ${PORT}`)});