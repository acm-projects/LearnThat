require('dotenv').config()

const apiKey = process.env.API_KEY;
console.log(apiKey);

const {Translate} = require('@google-cloud/translate').v2;

// Replace 'api_key' with your actual API key
const translate = new Translate({
  key: apiKey
});

async function translateText(text, targetLanguage) {
  try {
    const [translation] = await translate.translate(text, targetLanguage);
    console.log(`Original: ${text}`);
    console.log(`Translation: ${translation}`);
  } catch (err) {
    console.error('ERROR:', err);
  }
}

// Example usage
const textToTranslate = 'Hello, world!';
const targetLanguage = 'es'; // Spanish

translateText(textToTranslate, targetLanguage);



/*

run these following lines in the terminal to get it to work make sure to have an api key
cd LearnThat
npm install @google-cloud/translate
node translate.js

*/