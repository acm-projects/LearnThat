const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Translate } = require('@google-cloud/translate').v2;
const admin = require('firebase-admin');
require('dotenv').config();
const app = express();
const port = 3000;

const translate = new Translate({
    key: 'AIzaSyCMD8xcQayDQ6v4COy3TQ6RGOCb-qk77_8', // Your Google API key
});

// Initialize Firebase Admin SDK with service account credentials
const serviceAccount = require('./firebaseServiceAccount.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore(); // Firestore instance

app.use(cors()); 
app.use(express.json());
app.use(bodyParser.json()); 

// Translate and save the highlighted text to Firestore
app.post('/translate', async (req, res) => {
    const { text, targetLanguage } = req.body;

    try {
        // Call Google Translate API
        const [translation] = await translate.translate(text, targetLanguage);

        // Save the highlighted text and its translation into Firestore
        const docRef = db.collection('translations').doc(); // Create a new document with a unique ID
        await docRef.set({
            originalText: text,
            translatedText: translation,
            targetLanguage: targetLanguage,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        });

        // Send back the translation result
        res.json({ original: text, translation });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Translation failed or saving to Firestore failed' });
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