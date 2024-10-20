const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Translate } = require('@google-cloud/translate').v2;
const textToSpeech = require('@google-cloud/text-to-speech');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage'); 
require('dotenv').config();
const app = express();
const port = 3000;

const serviceAccount = require('./firebaseServiceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://learnthat-217f4.appspot.com', 
});
const db = admin.firestore(); // Firestore instance

// Initialize Google Cloud Translation
const translate = new Translate({
    key: process.env.API_KEY,
});

// Initialize Google Cloud Text-to-Speech
const client = new textToSpeech.TextToSpeechClient({
    keyFilename: './firebaseServiceAccount.json',
});

// Initialize Google Cloud Storage
const bucket = admin.storage().bucket();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Translate and save the highlighted text to Firestore and Firebase Storage
app.post('/translate', async (req, res) => {
    const { text, targetLanguage } = req.body;

    try {
        const [translation] = await translate.translate(text, targetLanguage);

        const request = {
            input: { text: translation },
            voice: { languageCode: targetLanguage, ssmlGender: 'NEUTRAL' },
            audioConfig: { audioEncoding: 'MP3' },
        };

        const [response] = await client.synthesizeSpeech(request);

        const audioFileName = `audio_${Date.now()}.mp3`;
        const file = bucket.file(`audio/${audioFileName}`); // Save the audio file in the 'audio' folder

        const stream = file.createWriteStream({
            metadata: {
                contentType: 'audio/mpeg',
            },
        });

        stream.end(response.audioContent, 'binary');

        stream.on('finish', async () => {
            const audioFileUrl = await file.getSignedUrl({
                action: 'read',
                expires: '03-01-2500', 
            });

            const docRef = db.collection('translations').doc(); 
            await docRef.set({
                originalText: text,
                translatedText: translation,
                targetLanguage: targetLanguage,
                audioFileUrl: audioFileUrl[0], // Save the audio file URL
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
            });

            // Send back the translation result and audio URL
            res.json({ original: text, translation, audioFileUrl: audioFileUrl[0] });
        });

        stream.on('error', (err) => {
            console.error('Error uploading audio to Firebase Storage:', err);
            res.status(500).json({ error: 'Failed to upload audio to Firebase Storage' });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Translation or audio synthesis failed' });
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
npm install @google-cloud/text-to-speech
npm install @google-cloud/storage
npm install fs
node translate.js


*/