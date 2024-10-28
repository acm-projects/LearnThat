import "./Popup.css";
import { useState } from "react";

import Dropdown from "./components/Dropdown.tsx";
import TermView from "./components/TermView.tsx";
import { Term } from "./components/Flashcard.tsx";

function Popup() {
    const languages = ["Deutsch", "Español"];
    const url =
        "https://storage.googleapis.com/learnthat-217f4.appspot.com/audio/audio_1729738254674.mp3";
    let terms: Term[][] = [
        [
            { selection: "hallo", translation: "hello", audioUrl: url },
            {
                selection: "bitte",
                translation:
                    "please is the translation of the word that is the selection",
                audioUrl: url,
            },
            { selection: "hallo", translation: "hello", audioUrl: url },
            { selection: "bitte", translation: "please", audioUrl: url },
            { selection: "hallo", translation: "hello", audioUrl: url },
            { selection: "bitte", translation: "please", audioUrl: url },
            { selection: "hallo", translation: "hello", audioUrl: url },
            { selection: "bitte", translation: "please", audioUrl: url },
            { selection: "hallo", translation: "hello", audioUrl: url },
            { selection: "bitte", translation: "please", audioUrl: url },
        ],
        [
            { selection: "hola", translation: "hello", audioUrl: url },
            { selection: "por favor", translation: "please", audioUrl: url },
        ],
    ];
    const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(1);

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
            <TermView>{terms[selectedLanguageIndex]}</TermView>
        </>
    );
}

export default Popup;
