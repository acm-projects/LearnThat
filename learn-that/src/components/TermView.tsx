import Flashcard, { Term } from "./Flashcard";

interface Props {
    children: Term[]; // terms, each string[] element is [selection, translation]
}

const TermView = ({ children }: Props) => {
    return (
        <>
            <div className="term-view ">
                <h1 className="term-view-title">Recently Added Terms</h1>
                <div className="term-view-term-area">
                    {children.map((term) => (
                        <Flashcard>{term}</Flashcard>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TermView;
