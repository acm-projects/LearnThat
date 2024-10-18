import "./Popup.css";
import { useState } from "react";

import Dropdown from "./components/Dropdown.tsx";
import TermView from "./components/TermView.tsx";
import { Term } from "./components/Flashcard.tsx";

function Popup() {
    const languages = ["Deutsch", "Español"];

    var terms: Term[][] = [
        [
            { selection: "hallo", translation: "hello" },
            {
                selection: "bitte",
                translation:
                    "please is the translation of the word that is the selection",
            },
            { selection: "hallo", translation: "hello" },
            { selection: "bitte", translation: "please" },
            { selection: "hallo", translation: "hello" },
            { selection: "bitte", translation: "please" },
            { selection: "hallo", translation: "hello" },
            { selection: "bitte", translation: "please" },
            { selection: "hallo", translation: "hello" },
            { selection: "bitte", translation: "please" },
        ],
        [
            { selection: "hola", translation: "hello" },
            { selection: "por favor", translation: "please" },
        ],
    ];

    const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(1);

    return (
        <>
            <a href="https://localhost:3000" target="_blank">
                <div>
                    <h1 className="title">LearnThat</h1>
                </div>
            </a>
            <Dropdown
                selectedLanguageIndex={selectedLanguageIndex}
                onLanguageSelect={setSelectedLanguageIndex}
            >
                {languages}
            </Dropdown>
            <TermView>{terms[selectedLanguageIndex]}</TermView>
        </>
    );
}

export default Popup;
