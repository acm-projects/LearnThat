//The file for highlighting the word and making it show up in the browser 4


document.addEventListener('mouseup',() =>{
    const highlightedText = window.getSelection().toString().trim();

    if(highlightedText.length > 0)
    {
        console.log("The word Highlighted by the user is: ", highlightedText);
        fetch('http://localhost:3000/translate', { //Will need to be changed when we host our website
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
            // Handling the response
            if (!response.ok) {
              throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json(); // Parse the JSON response
          })
        .then(data => {
            console.log('Translated text: ', data.translation);
        })
            
        //.catch(error => {
          //  console.error('Error fetching translation');
        //});
    }
    });

    
    //to run this properly:
    /*
    npm install dotenv
    npm install cors
    npm install express
    node translate.js (to host the server for our base url)
    When done make sure to control c in terminal or else whenever you highlight stuff on your laptop the api will be called
    and we will run out of requests
    */
    
