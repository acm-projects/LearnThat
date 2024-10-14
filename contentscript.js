//The file for highlighting the word and making it show up in the browser 4

document.addEventListener('mouseup', (event) => {
    const selectedText = window.getSelection().toString().trim();

    if (selectedText.length > 0) {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);

            // Get the bounding box of the selected text
            const rect = range.getBoundingClientRect();
            //This is how the tooltip gets the highlighted text and translated text
            function fetchTranslation(text) {
                fetch('http://localhost:3000/translate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        text: text,  // Text to translate
                        targetLanguage: 'es'
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Translation:', data.translation);
            
                    // Update the tooltip with the translated text
                    let tooltip = document.getElementById('tooltip');
                    if (tooltip) {
                        tooltip.innerHTML =  ` Selected Text: ${selectedText} <br> Translation: ${data.translation} <br>
                        <button id="saveButton">Save</button> `;
                        
                    }
                   return data.translation;
                })
                .catch(error => {
                    console.error('Error fetching translation:', error);
                });
            }
            
            

            // Call your translation API
            translation = fetchTranslation(selectedText);

            // Show the tooltip with translation (keeping the blue highlight)
            showTooltip(event, translation, selectedText, rect);

           

        }
    } else {
        // Hide tooltip if no text is selected
        hideTooltip();
    }
});

// Tooltip logic
function showTooltip(event, translation, text, rect) {
    let tooltip = document.getElementById('tooltip');
    
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = '#fff';
        tooltip.style.border = '1px solid #ccc';
        tooltip.style.padding = '50px';
        tooltip.style.zIndex = '1000';
        tooltip.style.visibility = 'hidden';
        document.body.appendChild(tooltip);
    }

    //tooltip.textContent = `The phrase highlighted is: ${text}  Translation: ${translation}`;
   
   
    tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2}px`; // Align tooltip horizontally
    tooltip.style.top = `${rect.top + window.scrollY - 40}px`; // Position tooltip above the selected text
    tooltip.style.visibility = 'visible';
    
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.style.visibility = 'hidden';
    }
}

function updateTooltip(translation, text) {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        // Update the tooltip content with the actual translation
        tooltip.textContent = `Selected Text: ${text}\nTranslation: ${translation}`;
    }
}
/*
// Translation logic
function fetchTranslation(text) {
    fetch('http://localhost:3000/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: text,  // Text to translate
            targetLanguage: 'es'
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Translation:', data.translation);

        // Update the tooltip with the translated text
        let tooltip = document.getElementById('tooltip');
        if (tooltip) {
            tooltip.textContent =  ` Translation: ${data.translation}`;
        }
       return data.translation;
    })
    .catch(error => {
        console.error('Error fetching translation:', error);
    });
}
*/
// Hide the tooltip when the selection is cleared (mouse is clicked outside the selected text)
document.addEventListener('mousedown', hideTooltip);



    
    //to run this properly:
    /*
    npm install dotenv
    npm install cors
    npm install express
    node translate.js (to host the server for our base url)
    When done make sure to control c in terminal or else whenever you highlight stuff on your laptop the api will be called
    and we will run out of requests
    */
    
