import "./Popup.css";
import { useState } from "react";

import Dropdown from "./components/Dropdown.tsx";
import TermView from "./components/TermView.tsx";
import { Term } from "./components/Flashcard.tsx";

const referenceLanguages = [
    ["af", "Afrikaans"],
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
];

function Popup() {
    const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);
    const [languages, setLanguages] = useState(["No Terms"]);
    const [terms, setTerms] = useState([
        [
            {
                originalText: "No Terms Added Yet",
                translatedText: "No Terms Added Yet",
                audioFileUrl: "",
            },
        ],
    ]);

    async function getTermData() {
        let newTerms: Term[][] = [];
        let newLanguages: string[] = [];

        await fetch("http://localhost:3000/translations")
            .then((x) => x.text()) // request text from page
            .then((y) => {
                let termDataString = y;
                if (termDataString == "[]") {
                    return;
                }
                const termData: String[][] = termDataString
                    .slice(2)
                    .slice(0, termDataString.length - 4)
                    .split("},{")
                    .map((x) => x.split(","))
                    .map((x) =>
                        x.map((y) => y.slice(y.indexOf(":") + 2, y.length - 1))
                    ); //
                termData.forEach((x) => {
                    const newTerm: Term = {
                        originalText: x[0].valueOf(),
                        translatedText: x[1].valueOf(),
                        //targetLanguage: x[2].valueOf(),
                        audioFileUrl: x[3].valueOf(),
                    };
                    let referenceLanguage = referenceLanguages.find(
                        (y) => y[0] == x[2]
                    );
                    let language = "undefined";
                    if (referenceLanguage) language = referenceLanguage[1];
                    if (newLanguages.indexOf(language) == -1) {
                        newLanguages.push(language);
                        newTerms.push([]);
                    }
                    newTerms[newLanguages.indexOf(language)].push(newTerm);
                });
                console.log(newTerms);
                setLanguages(newLanguages);
                setTerms(newTerms);
            });
    }

    getTermData();
    console.log(languages);
    return (
        <>
            <a href="http://localhost:5173" target="_blank" className="title">
                <h1 className="popup-title">LearnThat</h1>
            </a>
            <Dropdown
                selectedLanguageIndex={selectedLanguageIndex}
                onLanguageSelect={setSelectedLanguageIndex}
            >
                {languages}
            </Dropdown>
            <TermView title="Recently Added Terms">
                {terms[selectedLanguageIndex]}
            </TermView>
        </>
    );
}

export default Popup;
