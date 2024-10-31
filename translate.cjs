
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Translate } = require('@google-cloud/translate').v2;
const textToSpeech = require('@google-cloud/text-to-speech');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = 3000;

const serviceAccount = require('./firebaseServiceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore(); 


const translate = new Translate({
    key: process.env.API_KEY, //Might need to hardcode api key later now
});

const client = new textToSpeech.TextToSpeechClient({
    keyFilename: './firebaseServiceAccount.json',
});

const storage = new Storage({
    keyFilename: './firebaseServiceAccount.json',
});
const bucketName = 'learnthat-217f4.appspot.com';

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Translate and save the highlighted text to Firestore
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
        fs.writeFileSync(audioFileName, response.audioContent, 'binary');

        await uploadAudioToStorage(audioFileName);
        const audioFileUrl = `https://storage.googleapis.com/${bucketName}/audio/${audioFileName}`;

        //const docRef = db.collection('translations').doc(targetLanguage).collection('words');
        //await docRef.set({
          //  originalText: text,
            //translatedText: translation,
            //targetLanguage: targetLanguage,
            //audioFileUrl: audioFileUrl,
            //timestamp: admin.firestore.FieldValue.serverTimestamp(),
        //});

        res.json({ original: text, translation, audioFileUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Translation failed or saving to Firestore failed' });
    }
});

app.post('/save-translation', async (req, res) => {
    const { originalText, translatedText, targetLanguage} = req.body;

    //Comment this out, put this stuff in translation, make new endpoint to fetch translation
    
    try {
        // Create a new document with a unique ID
        const translatedWords = db.collection('translations').doc(targetLanguage).collection('words');
            
        const docRef = await translatedWords.add({
            originalText,
            translatedText,
            targetLanguage,
            //audioFileUrl,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        });

        res.json({ 
            success: true, 
            message: 'Translation saved successfully',
            docId: docRef.id 
        });
    } catch (err) {
        console.error('Error saving to Firestore:', err);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to save translation' 
        });
    }
});

app.delete('/delete-translation', async (req, res) => {
    const { originalText } = req.body; 

    try {
        const translationsRef = db.collection('translations'); 
        const snapshot = await translationsRef.where('originalText', '==', originalText).get(); 
        if (snapshot.empty) {
            return res.status(404).json({ message: 'No matching document found.' }); 
        }

        const deletePromises = []; 
        snapshot.forEach(doc => {
            deletePromises.push(translationsRef.doc(doc.id).delete()); 
        });

        await Promise.all(deletePromises); 
        return res.json({ message: 'Word deleted successfully.' }); 
    } catch (error) {
        console.error('Error deleting document:', error);
        return res.status(500).json({ message: 'Error deleting word.' }); 
    }
});

// Function to upload audio file to Firebase Storage
async function uploadAudioToStorage(fileName) {
    try {
        await storage.bucket(bucketName).upload(fileName, {
            destination: `audio/${fileName}`,
            metadata: {
                contentType: 'audio/mpeg',
            },
        });
        fs.unlinkSync(fileName); 
    } catch (error) {
        console.error('Error uploading audio to Firebase Storage:', error);
        throw error;
    }
}

app.get('/audio/:fileName', (req, res) => {
    const filePath = req.params.fileName;
    res.sendFile(`${__dirname}/${filePath}`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


// Example usage
/*
const textToTranslate = 'Hello, world!';
const targetLanguage = 'es'; // Spanish
translateText(textToTranslate, targetLanguage);
*/

/*
Run the following lines in the terminal to get it to work. Make sure to have an API key:
cd LearnThat
npm install @google-cloud/translate
npm install @google-cloud/text-to-speech
npm install @google-cloud/storage
npm install fs
node public/translate.js
*/
