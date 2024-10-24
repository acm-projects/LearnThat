// The file for highlighting the word and making it show up in the browser
document.addEventListener('mouseup', () => {
    const highlightedText = window.getSelection().toString().trim();

    if (highlightedText.length > 0) {
        console.log("The word highlighted by the user is: ", highlightedText);
        fetch('http://localhost:3000/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: highlightedText,    // The text to translate
                targetLanguage: 'es' // Use the selected language
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Translated text: ', data.translation);
        })
        .catch(error => {
            console.error('Error fetching translation:', error);
        });
    }
});

// Instructions to run this properly:
/*
1. Install necessary packages:
   npm install dotenv cors express

2. Go to translate.js for more npm installations:
   npm install @google-cloud/translate
   npm install @google-cloud/text-to-speech
   npm install @google-cloud/storage
   npm install fs

3. Start the server:
   node translate.js (to host the server for our base URL)

4. Make sure to stop the server (control + C in terminal) when done to prevent unnecessary API calls.
*/
