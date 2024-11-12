import { useState, useEffect } from "react";

import "./Flashcard.css";

export interface Term {
    originalText: string;
    translatedText: string;
    audioFileUrl: string;
}

interface Props {
    children: Term;
}

const Flashcard = ({
    children: { originalText, translatedText, audioFileUrl },
}: Props) => {
    const selection = originalText;
    const translation = translatedText;
    const audioUrl = audioFileUrl;
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => setIsFlipped(false), [selection, translation]); // reset flashcard when selection or translation is updated (when language is changed)

    const cardSide = isFlipped ? translation : selection;

    const flashcardSideClass =
        "term-flashcard-side " +
        (isFlipped ? "term-flashcard-side-translation" : "");

    return (
        <button
            className={
                "btn btn-secondary term-flashcard " +
                (isFlipped ? "term-flashcard-flipped" : "")
            }
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <p className={flashcardSideClass}>{cardSide}</p>
            {isFlipped && (
                <a
                    className={flashcardSideClass}
                    onClick={(event) => pronounce(event, audioUrl)}
                >
                    <i className={"fi fi-rr-volume"}></i>
                </a>
            )}
        </button>
    );
};

function pronounce(event: React.MouseEvent, url: string) {
    event.stopPropagation();
    const audio = new Audio(url);
    audio.play();
    //    console.log("pronounce " + term.selection);
}

export default Flashcard;
