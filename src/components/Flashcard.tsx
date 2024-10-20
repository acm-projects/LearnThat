import { useState } from "react";

import "./Flashcard.css";

export interface Term {
    selection: string;
    translation: string;
}

interface Props {
    children: Term;
}

const Flashcard = ({ children: { selection, translation } }: Props) => {
    const [isFlipped, setIsFlipped] = useState(false);

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
            {!isFlipped && (
                <a
                    className={flashcardSideClass}
                    onClick={(event) => pronounce(event, cardSide)}
                >
                    <i className={"fi fi-rr-volume"}></i>
                </a>
            )}
        </button>
    );
};

function pronounce(event: React.MouseEvent, text: string) {
    event.stopPropagation();
    console.log("pronounce " + text);
}

export default Flashcard;
