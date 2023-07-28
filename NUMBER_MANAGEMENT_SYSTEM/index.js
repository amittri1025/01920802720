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

    try {
        const fetchedData = await Promise.all(urls.map(fetchNumbers));
    

        //merging
        const mergedNumbers = fetchedData.reduce((acc, numbers) => {
          acc.push(...numbers);
          return acc;
        }, []);
    
    //sorting in ascending
    mergedNumbers.sort((a, b) => a - b);
    
    const uniqueNumbers = Array.from(new Set(mergedNumbers));

    res.json({ numbers: uniqueNumbers });
    
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
})


async function fetchNumbers(url) {

    try {
      const response = await axios.get(url);
      return response.data.numbers;
} catch (error) {
console.error(`failed to fetch data, url: ${url}`);
return [];
}
  }
