import { useEffect } from "react";
import Flashcard, { Term } from "./Flashcard";
import "./TermView.css";

interface Props {
    children: Term[]; // terms, each string[] element is [selection, translation]
}

const TermView = ({ children }: Props) => {
    useEffect(() => {}, children);
    return (
        <>
            <div className="term-view ">
                <h1 className="term-view-title">Recently Added Terms</h1>
                <div className="term-view-term-area">
                    <ul>
                        {children.map((term, index) => (
                            <li key={index}>
                                <Flashcard>{term}</Flashcard>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default TermView;
