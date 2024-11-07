//import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
//The file for highlighting the word and making it show up in the browser 4

document.addEventListener('mouseup', (event) => {
    
    const tooltip = document.getElementById('tooltip');
    if (tooltip && tooltip.contains(event.target)) {
        return; // don't do anything if you just clicked on the tooltip
    }
    
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

            
            // Initial translation with default language (81 is the index of Spanish)
            fetchTranslation(selectedText, 81 ,tooltip);

            //commit
            
            
            
            
        }
    } 
    else 
    {
        hideTooltip();
    }
});


function fetchTranslation(text, targetLanguageIndex, tooltip) { //API to get the translation
    const languages = [["af", "Afrikaans"],
["sq", "Albanian"],
["am", "Amharic"],
["ar", "Arabic"],
["hy", "Armenian"],
["az", "Azerbaijani"],
["eu", "Basque"],
["be", "Belarusian"],
["bn", "Bengali"],
["bs", "Bosnian"],
["bg", "Bulgarian"],
["ca", "Catalan"],
["ceb", "Cebuano"],
["zh-CN", "Chinese (Simplified)"],
["zh-TW", "Chinese (Traditional)"],
["co", "Corsican"],
["hr", "Croatian"],
["cs", "Czech"],
["da", "Danish"],
["nl", "Dutch"],
["en", "English"],
["eo", "Esperanto"],
["et", "Estonian"],
["fi", "Finnish"],
["fr", "French"],
["gl", "Galician"],
["ka", "Georgian"],
["de", "German"],
["el", "Greek"],
["gu", "Gujarati"],
["ht", "Haitian Creole"],
["ha", "Hausa"],
["he", "Hebrew"],
["hi", "Hindi"],
["hu", "Hungarian"],
["is", "Icelandic"],
["ig", "Igbo"],
["id", "Indonesian"],
["ga", "Irish"],
["it", "Italian"],
["ja", "Japanese"],
["jv", "Javanese"],
["kn", "Kannada"],
["kk", "Kazakh"],
["km", "Khmer"],
["ko", "Korean"],
["ku", "Kurdish (Kurmanji)"],
["ky", "Kyrgyz"],
["lo", "Lao"],
["la", "Latin"],
["lv", "Latvian"],
["lt", "Lithuanian"],
["lb", "Luxembourgish"],
["mk", "Macedonian"],
["mg", "Malagasy"],
["ms", "Malay"],
["ml", "Malayalam"],
["mt", "Maltese"],
["mi", "Maori"],
["mr", "Marathi"],
["mn", "Mongolian"],
["ne", "Nepali"],
["no", "Norwegian"],
["ps", "Pashto"],
["fa", "Persian"],
["pl", "Polish"],
["pt-PT", "Portuguese (Portugal)"],
["pt-BR", "Portuguese (Brazil)"],
["pa", "Punjabi"],
["ro", "Romanian"],
["ru", "Russian"],
["sm", "Samoan"],
["gd", "Scots Gaelic"],
["sr", "Serbian"],
["st", "Sesotho"],
["sn", "Shona"],
["sd", "Sindhi"],
["si", "Sinhala"],
["sk", "Slovak"],
["sl", "Slovenian"],
["so", "Somali"],
["es", "Spanish"],
["su", "Sundanese"],
["sw", "Swahili"],
["sv", "Swedish"],
["tl", "Tagalog"],
["tg", "Tajik"],
["ta", "Tamil"],
["tt", "Tatar"],
["te", "Telugu"],
["th", "Thai"],
["tr", "Turkish"],
["uk", "Ukrainian"],
["ur", "Urdu"],
["uz", "Uzbek"],
["vi", "Vietnamese"],
["cy", "Welsh"],
["xh", "Xhosa"],
["yi", "Yiddish"],
["yo", "Yoruba"],
["zu", "Zulu"],
]
    
    targetLanguage=languages[targetLanguageIndex][0];
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
        let html = `            
    <div class="tooltip-content learn-that-tooltip">
      <div class="text-box">
        <p>${text}</p>
      </div>
      <div class="text-box">
        <p>${data.translation}</p>
      </div>      
      <div class="add-bar">
        <button id="saveButton">+</button>
        <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" name="language" id="language" type="button" data-bs-toggle="dropdown" data-bs-display="static">
                        <p>Select Language</p>
            </button>          
            <ul class="dropdown-menu" id="language-dropdown">`;
                    languages.map((x,index)=>
                    "<li key=\""+index+ "\"><a class=\"tooltip-language-select-dropdown-item dropdown-item\" >"+x[1]+"</a></li>")
                        .forEach(x=>html+=x);
html+=`
            </ul>
        </div>
      </div>
        
    </div>  
        `;
        tooltip.innerHTML=html;

        // Set the current language in the dropdown
        const languageSelect = document.getElementById('language');
        languageSelect.querySelector('p').innerHTML = languages[targetLanguageIndex][1];

        const languageDropdownChildren = Array.from(document.getElementById('language-dropdown').children);

        // Add onclick for language change
        languageDropdownChildren.forEach(x=>{                    
            let y = x.querySelector('a');            
            y.onclick = () => {                            
                fetchTranslation(text, x.getAttribute('key'), tooltip);        
            }
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

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

// Add listener to close tooltip only if clicked outside
document.addEventListener('mousedown', (event) => {
    const tooltip = document.getElementById('tooltip');
    if (tooltip){
        if(tooltip.contains(event.target)) 
        {
            event.preventDefault();
        }
        else
        {
            hideTooltip();            
        }
    }
});





// const link = document.createElement('link');
// link.href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
// link.rel="stylesheet";
// document.head.appendChild(link);

// const script = document.createElement('script');
// script.src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
// document.head.appendChild(script);


// Add styles
const style = document.createElement('style');
style.textContent = `
#tooltip {
    background: rgba(50, 111, 177, 0.8);
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.25);
    max-width: 400px;
    z-index: 1000;
}

.tooltip-content {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.text-box
{
background-color: white;
border-radius: 15px; 
padding:0;
min-height:57px;
}

.text-box p
{
font-size: 24px;
font-weight: 500;
margin: 14px 25px;
}
.add-bar
{
display:flex;
}

#language {
    border-radius:5px;
    text-align:center;
    width: 165px;
    height:40px;
  font-size:16px;
  font-weight:550;
  background: rgba(66, 199, 213, 1) !important;
color: black !important;
border: none !important;
position: relative !important;
z-index: 1 !important;
display:flex !important;
}

#language:focus-visible {
    box-shadow: none;
}

.dropdown-menu
{
    background-color: rgba(196, 246, 251, 1) !important;
    width: 165px !important;
    min-width: 0 !important;
    max-height: 15em !important;
    overflow-y: scroll !important;
    overflow-x: hidden !important;
    color:black !important;
    top: 30px !important;
    z-index: 0 !important;
    border:0 !important;    
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
}

.dropdown-menu::-webkit-scrollbar
{
    width: 7px;
}

.dropdown-menu::-webkit-scrollbar-track
{
    background:#c4f6fb;

}

.dropdown-menu::-webkit-scrollbar-thumb
{
    background: rgba(129, 198, 204, 1);
    border-radius: 10px;
}

.dropdown-toggle p
{
    text-overflow: ellipsis;
    max-width: 140px;    
    overflow-x: clip;
    margin: auto;
}

.dropdown-toggle::after
{
margin:auto;
    }

.tooltip-language-select-dropdown-item {
  font-weight: bold !important;
  font-size: 16px !important;
  border-radius: 5px !important;
  margin: 4px 6px !important;
  width: auto !important;

  display: inline-block;  
    max-width: 165px;     
    white-space: normal !important;
    word-wrap: break-word;
}

a.tooltip-language-select-dropdown-item.dropdown-item {
    white-space: normal !important;
}

.dropdown-item:hover{
  background-color: #98eef7 !important;
  color: black !important;
}

.dropdown-item:active{
  color:black !important;
}

#saveButton {  
  background: rgba(66, 199, 213, 1) !important;
  color: black !important;
  border: none !important;      
  margin-left: auto;
  margin-right: 13px;
  border-radius: 13px;
    cursor: pointer;
    font-size: 40px;
    line-height: 0.95;
    width: 40px;
}

#saveButton:hover {
    background: rgba(29, 178, 194, 1);
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
    and we will run out of requests now
    */
    
/*




#tooltip {
        background: rgba(50, 111, 177, 0.8);
        border: 1px solid #ccc;
        border-radius: 20px;
        padding: 20px;
        box-shadow: 4px 4px 4px rgba(0,0,0,0.25);
        max-width: 400px;
        z-index: 1000;
    }

    .tooltip-content {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

.text-box
{
  background-color: white;
  border-radius: 15px; 
  padding:0;
}

.text-box p
{
  font-size: 24px;
  font-weight: 500;
  margin: 10px 25px 14px;
  
}
.add-bar
{
  display:flex;
}
.add-bar *
{
  background: rgba(66, 199, 213, 1) !important;
  color: black !important;
  border: none !important;
}
    #language {
        border-radius:5px;
        text-align:center;
        width: 145px;
      font-size:16px;
      font-weight:500;
    }

    #saveButton {        
      margin-left: auto;
      margin-right: 13px;
      border-radius: 13px;
        cursor: pointer;
        font-size: 40px;
        line-height: 1;
        width: 40px;
    }

    #saveButton:hover {
        background: rgba(29, 178, 194, 1);
    }



*/