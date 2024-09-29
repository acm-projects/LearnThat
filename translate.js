
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Translate } = require('@google-cloud/translate').v2;
require('dotenv').config();
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON bodies
app.use(bodyParser.json()); // Parse JSON request bodies

const translate = new Translate({
    key: process.env.API_KEY, // Your Google API key
});

app.post('/translate', async (req, res) => {
    const { text, targetLanguage } = req.body;

    try {
        const [translation] = await translate.translate(text, targetLanguage); //calls google api translation tool
        res.json({ original: text, translation }); //The response in text format
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Translation failed' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


/*
// Example usage
const textToTranslate = 'Hello, world!';
const targetLanguage = 'es'; // Spanish

translateText(textToTranslate, targetLanguage);
*/


/*

run these following lines in the terminal to get it to work make sure to have an api key
cd LearnThat
npm install @google-cloud/translate
node translate.js


*/