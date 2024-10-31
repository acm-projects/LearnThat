import { useEffect } from "react";
import Flashcard, { Term } from "./Flashcard";
import "./TermView.css";

interface Props {
    showFolders?: boolean;
    title?: string;
    children: Term[]; // terms, each string[] element is [selection, translation]
}

const TermView = ({ showFolders = false, title = "", children }: Props) => {
    useEffect(() => {}, children);
    return (
        <>
            <div className="term-view ">
                {title && <h1 className="term-view-title">{title}</h1>}
                <div className="term-view-term-area">
                    <ul>
                        {showFolders && (
                            <li
                                key="folder"
                                style={{ backgroundColor: "white" }}
                            >
                                folder
                            </li>
                        )}
                        {children.map((term, index) => (
                            <li className="term" key={index}>
                                <Flashcard>{term}</Flashcard>
                            </li>
                        ))}
                        {showFolders && (
                            <li
                                key="newfolder"
                                style={{
                                    width: "25%",
                                    margin: "auto",
                                    backgroundColor: "white",
                                }}
                            >
                                add new folder
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default TermView;
