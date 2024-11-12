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
    key: process.env.API_KEY, 
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


// Array to store each translation's data
const translationsArray = [];


app.post('/translate', async (req, res) => {
    const { text, targetLanguage } = req.body;

    

    try {
        
        
        existingTranslation = getExistingTranslation(text, targetLanguage);

        if (existingTranslation) {
            // If it exists, respond with the existing translation
            return res.json({
                original: text,
                translation: existingTranslation.translatedText,
                targetLanguage: existingTranslation.targetLanguage,
                audioFileUrl: existingTranslation.audioFileUrl
            });
        }
        // Proceed with translation and text-to-speech synthesis
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

        // Folder destination for the audio file
        const folderDestination = `audio/${audioFileName}`;

        

        // Respond with the original text, translated text, and audio file URL
        res.json({ original: text, translation, targetLanguage, audioFileUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Translation failed or saving to Firestore failed' });
    }
});


app.post('/save-translation', async (req, res) => {
    const { originalText, translatedText, targetLanguage, audioFileUrl} = req.body;        

    existingTranslation = getExistingTranslation(originalText, targetLanguage);
    if(existingTranslation)
    {
        return res.status(500).json({ 
            success: false, 
            error: 'Translation already saved'
        });
    }

    try {
        
        
        // Create a new document with a unique ID
        const translatedWords = db.collection('translations').doc(targetLanguage).collection('words');

        const docRef = await translatedWords.add({
            originalText,
            translatedText,
            targetLanguage,
            audioFileUrl,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        });
                

        // Save the new data in the translationsArray
        translationsArray.push({
            originalText: originalText,  
            translatedText: translatedText,
            targetLanguage,
            audioFileUrl            //folderDestination,
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



// Endpoint to view the saved translations array
app.get('/translations', (req, res) => {
    res.json(translationsArray);
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


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



module.exports={translationsArray};


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

to view array go to 
http://localhost:3000/translations
*/




function getExistingTranslation(text, targetLanguage)
{
    // Normalize input text (trim spaces and convert to lowercase for case-insensitive comparison)
    const normalizedText = text.trim().toLowerCase();
            
    // Check if the normalized text already exists in translationsArray
    let existingTranslation = undefined;
    
    if(translationsArray.length>0)
    {

        existingTranslation=translationsArray.find(translation => 
            ((translation.originalText.toLowerCase().trim() === normalizedText) &&
            (translation.targetLanguage===targetLanguage))
        );
    }

    return existingTranslation
}
