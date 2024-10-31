//import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
//The file for highlighting the word and making it show up in the browser 4


document.addEventListener('mouseup', (event) => {
    const selectedText = window.getSelection().toString().trim();

    if (selectedText.length > 0) {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            // Create tooltip if it doesn't exist
            let tooltip = document.getElementById('tooltip');
            if (!tooltip) 
                {
                tooltip = document.createElement('div');
                tooltip.id = 'tooltip';
                document.body.appendChild(tooltip);
            }

            // Position the tooltip
            tooltip.style.position = 'absolute';
            tooltip.style.left = `${rect.left + window.scrollX}px`;
            tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
            tooltip.style.display = 'block';

            
            // Initial translation with default language (Spanish)
            fetchTranslation(selectedText, 'es' ,tooltip);

            //commit
            
            
            
            
        }
    } 
    else 
    {
        hideTooltip();
    }
});


function fetchTranslation(text, targetLanguage, tooltip) { //API to get the translation
    fetch('http://localhost:3000/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: text,
            targetLanguage: targetLanguage
        }),
    })
    
    .then(response => response.json())
    .then(data => {
        console.log('Translation:', data.translation);
        
        // Update the tooltip with the translated text and dropdown
        tooltip.innerHTML = `
            <div class="tooltip-content">
                <label for="language">Select a language to translate to:</label>
                <select name="language" id="language">
                    <option value="af">Afrikaans</option>
                    <option value="sq">Albanian</option>
                    <option value="am">Amharic</option>
                    <option value="ar">Arabic</option>
                    <option value="hy">Armenian</option>
                    <option value="az">Azerbaijani</option>
                    <option value="eu">Basque</option>
                    <option value="be">Belarusian</option>
                    <option value="bn">Bengali</option>
                    <option value="bs">Bosnian</option>
                    <option value="bg">Bulgarian</option>
                    <option value="ca">Catalan</option>
                    <option value="ceb">Cebuano</option>
                    <option value="zh-CN">Chinese (Simplified)</option>
                    <option value="zh-TW">Chinese (Traditional)</option>
                    <option value="co">Corsican</option>
                    <option value="hr">Croatian</option>
                    <option value="cs">Czech</option>
                    <option value="da">Danish</option>
                    <option value="nl">Dutch</option>
                    <option value="en">English</option>
                    <option value="eo">Esperanto</option>
                    <option value="et">Estonian</option>
                    <option value="fi">Finnish</option>
                    <option value="fr">French</option>
                    <option value="gl">Galician</option>
                    <option value="ka">Georgian</option>
                    <option value="de">German</option>
                    <option value="el">Greek</option>
                    <option value="gu">Gujarati</option>
                    <option value="ht">Haitian Creole</option>
                    <option value="ha">Hausa</option>
                    <option value="he">Hebrew</option>
                    <option value="hi">Hindi</option>
                    <option value="hu">Hungarian</option>
                    <option value="is">Icelandic</option>
                    <option value="ig">Igbo</option>
                    <option value="id">Indonesian</option>
                    <option value="ga">Irish</option>
                    <option value="it">Italian</option>
                    <option value="ja">Japanese</option>
                    <option value="jv">Javanese</option>
                    <option value="kn">Kannada</option>
                    <option value="kk">Kazakh</option>
                    <option value="km">Khmer</option>
                    <option value="ko">Korean</option>
                    <option value="ku">Kurdish (Kurmanji)</option>
                    <option value="ky">Kyrgyz</option>
                    <option value="lo">Lao</option>
                    <option value="la">Latin</option>
                    <option value="lv">Latvian</option>
                    <option value="lt">Lithuanian</option>
                    <option value="lb">Luxembourgish</option>
                    <option value="mk">Macedonian</option>
                    <option value="mg">Malagasy</option>
                    <option value="ms">Malay</option>
                    <option value="ml">Malayalam</option>
                    <option value="mt">Maltese</option>
                    <option value="mi">Maori</option>
                    <option value="mr">Marathi</option>
                    <option value="mn">Mongolian</option>
                    <option value="ne">Nepali</option>
                    <option value="no">Norwegian</option>
                    <option value="ps">Pashto</option>
                    <option value="fa">Persian</option>
                    <option value="pl">Polish</option>
                    <option value="pt-PT">Portuguese (Portugal)</option>
                    <option value="pt-BR">Portuguese (Brazil)</option>
                    <option value="pa">Punjabi</option>
                    <option value="ro">Romanian</option>
                    <option value="ru">Russian</option>
                    <option value="sm">Samoan</option>
                    <option value="gd">Scots Gaelic</option>
                    <option value="sr">Serbian</option>
                    <option value="st">Sesotho</option>
                    <option value="sn">Shona</option>
                    <option value="sd">Sindhi</option>
                    <option value="si">Sinhala</option>
                    <option value="sk">Slovak</option>
                    <option value="sl">Slovenian</option>
                    <option value="so">Somali</option>
                    <option value="es">Spanish</option>
                    <option value="su">Sundanese</option>
                    <option value="sw">Swahili</option>
                    <option value="sv">Swedish</option>
                    <option value="tl">Tagalog</option>
                    <option value="tg">Tajik</option>
                    <option value="ta">Tamil</option>
                    <option value="tt">Tatar</option>
                    <option value="te">Telugu</option>
                    <option value="th">Thai</option>
                    <option value="tr">Turkish</option>
                    <option value="uk">Ukrainian</option>
                    <option value="ur">Urdu</option>
                    <option value="uz">Uzbek</option>
                    <option value="vi">Vietnamese</option>
                    <option value="cy">Welsh</option>
                    <option value="xh">Xhosa</option>
                    <option value="yi">Yiddish</option>
                    <option value="yo">Yoruba</option>
                    <option value="zu">Zulu</option>
                </select>
                <div class="translation-content">
                    <p><strong>Selected Text:</strong> ${text}</p>
                    <p><strong>Translation:</strong> ${data.translation}</p>
                </div>
                <button id="saveButton">Save</button>
            </div>
        `;

        // Set the current language in the dropdown
        const languageSelect = document.getElementById('language');
        languageSelect.value = targetLanguage;

        // Add event listener for language change
        languageSelect.addEventListener('change', (event) => {
            
            const newLanguage = event.target.value;
            fetchTranslation(text, newLanguage, tooltip);
          
        });

        // Add event listener for save button
        const saveButton = document.getElementById('saveButton');
      
            saveButton.addEventListener('click', async () => {
                saveTranslation(text, data.translation, targetLanguage);
            })
   // .catch(error => {
   //     console.error('Error fetching translation:', error);
   //     tooltip.innerHTML = 'Error fetching translation. Please try again.';
   // });
});
}

//saveButton.addEventListener('click', async () => {
    async function saveTranslation(originalText, translatedText, targetLanguage) { //Save translation endpoint
        try {
            const response = await fetch('http://localhost:3000/save-translation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    originalText,
                    translatedText,
                    targetLanguage
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                console.log('Translation saved successfully with ID:', data.docId);
                return true;
            } else {
                console.error('Error saving translation:', data.error);
                return false;
            }
        } catch (error) {
            console.error('Error saving translation:', error);
            return false;
        }
    }
// work});

let tooltipVisible = false;
let hideTimeout;

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

// Add listener to close tooltip only if clicked outside
document.addEventListener('mousedown', (event) => {
    const tooltip = document.getElementById('tooltip');
    if (tooltip && !tooltip.contains(event.target)) {
        hideTimeout = setTimeout(() => {
            hideTooltip();
        }, 500); // Small delay to allow dropdown interaction
    }
});





// Add styles
const style = document.createElement('style');
style.textContent = `
    #tooltip {
        background: white;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 15px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        max-width: 400px;
        z-index: 1000;
    }

    .tooltip-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    #language {
        margin-top: 5px;
        padding: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    .translation-content {
        margin: 10px 0;
    }

    #saveButton {
        background: #4CAF50;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
    }

    #saveButton:hover {
        background: #45a049;
    }
`;
document.head.appendChild(style);

// Tooltip logic
function showTooltip(event, translation, text, rect) {
    let tooltip = document.getElementById('tooltip');
    
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = 'white';
        tooltip.style.border = '1px solid #ccc';
        tooltip.style.padding = '50px';
        tooltip.style.zIndex = '1000';
        tooltip.style.visibility = 'hidden';
        document.body.appendChild(tooltip);
    }

    //tooltip.textContent = `The phrase highlighted is: ${text}  Translation: ${translation}`;
   
   
    tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2}px`; // Align tooltip horizontally
    tooltip.style.top = `${rect.top + window.scrollY - 40}px`; // Position tooltip above the selected text
    tooltip.style.display = 'block'; 
    tooltip.style.visibility = 'visible';
    
}
/*
function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.style.visibility = 'hidden';
    }
}
    */





    
    //to run this properly:
    /*
    npm install dotenv hh
    npm install cors
    npm install express
    node translate.js (to host the server for our base url)
    When done make sure to control c in terminal or else whenever you highlight stuff on your laptop the api will be called
    and we will run out of requests
    */
    
