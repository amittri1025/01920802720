const express = require('express');
const app  = express();
const PORT = process.env.PORT|| 8008;

app.listen(PORT , ()=>{ console.log(`Number Management service is running at port ${PORT}`)});

app.get('/numbers', async (req, res) => {

    //getting the url
    const urls = req.query.url;

    // url should be array
    if (!urls || !Array.isArray(urls)) {
      return res.status(400).json({ error: 'invalid url' });
    
    }
})

