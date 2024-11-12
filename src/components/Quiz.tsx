import { useState, useEffect, useRef } from "react";
import "./Quiz.css";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
// @ts-ignore
import { CircleProgress } from "react-gradient-progress";
import Dropdown from "./Dropdown";
import { Term } from "./Flashcard.tsx";

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

const Quiz = () => {
    const [currentFlashcard, setCurrentFlashcard] = useState(0);
    const [score, setScore] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [quizComplete, setQuizComplete] = useState(false);

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

    if (languages[0] === "No Terms") {
        getTermData();
    }
    console.log(languages);

    const [selectedLanguages, setSelectedLanguages] = useState(
        languages.map(() => true)
    );

    if (selectedLanguages.length != languages.length) {
        setSelectedLanguages(languages.map(() => true));
    }
    console.log(selectedLanguages);

    // const flashcardsData: {
    //     [key: string]: { [key: string]: { [key: string]: string }[] };
    // } = {
    //     日本語: {
    //         Adjectives: [
    //             {
    //                 front: "Japanese Adjective 1 - Front",
    //                 back: "Japanese Adjective 1 - Back",
    //             },
    //             {
    //                 front: "Japanese Adjective 2 - Front",
    //                 back: "Japanese Adjective 2 - Back",
    //             },
    //         ],
    //         Nouns: [
    //             {
    //                 front: "Japanese Noun 1 - Front",
    //                 back: "Japanese Noun 1 - Back",
    //             },
    //             {
    //                 front: "Japanese Noun 2 - Front",
    //                 back: "Japanese Noun 2 - Back",
    //             },
    //         ],
    //     },
    //     English: {
    //         Adjectives: [
    //             {
    //                 front: "English Adjective 1 - Front",
    //                 back: "English Adjective 1 - Back",
    //             },
    //             {
    //                 front: "English Adjective 2 - Front",
    //                 back: "English Adjective 2 - Back",
    //             },
    //         ],
    //         Nouns: [
    //             {
    //                 front: "English Noun 1 - Front",
    //                 back: "English Noun 1 - Back",
    //             },
    //             {
    //                 front: "English Noun 2 - Front",
    //                 back: "English Noun 2 - Back",
    //             },
    //         ],
    //     },
    // };

    const getFilteredFlashcards = () => {
        let flashcards = terms
            .filter((_languageTerms, index) => selectedLanguages[index])
            .flat(1);
        if (flashcards.length == 0) {
            flashcards = [
                {
                    originalText: "No Terms Added Yet",
                    translatedText: "No Terms Added Yet",
                    audioFileUrl: "",
                },
            ];
        }
        return flashcards;
    };

    let filteredFlashcards = getFilteredFlashcards();
    console.log(filteredFlashcards);
    const totalFlashcards = filteredFlashcards.length;

    const handleCheckboxChange =
        (languageIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
            console.log(languageIndex + "  " + e.target.checked);
            let newSelectedLanguages = Array.from(selectedLanguages);
            newSelectedLanguages[languageIndex] = e.target.checked;
            setSelectedLanguages(newSelectedLanguages);
            console.log(selectedLanguages);
            filteredFlashcards = getFilteredFlashcards();
            handleTryAgain();
        };

    const handleNextFlashcard = (isCorrect: boolean) => {
        if (isCorrect) {
            setScore((prevScore) => prevScore + 1);
        }
        if (currentFlashcard < totalFlashcards - 1) {
            const nextFlashcard = currentFlashcard + 1;
            setCurrentFlashcard(nextFlashcard);
            setProgress((nextFlashcard / totalFlashcards) * 100);
            setIsFlipped(false);
        } else {
            setShowResult(true);
            setQuizComplete(true);
        }
    };

    const toggleFlip = () => {
        setIsFlipped((prev) => !prev);
    };

    const handleTryAgain = () => {
        setCurrentFlashcard(0);
        setScore(0);
        setProgress(0);
        setIsFlipped(false);
        setShowResult(false);
        setQuizComplete(false);
    };

    // Animated progress effect when the quiz is completed
    useEffect(() => {
        if (showResult) {
            const targetPercentage = Math.round(
                (score / totalFlashcards) * 100
            );
            let currentPercentage = 0;

            const interval = setInterval(() => {
                currentPercentage += 1;
                if (currentPercentage >= targetPercentage) {
                    setProgress(targetPercentage); // Ensure it stops at the target
                    clearInterval(interval);
                } else {
                    setProgress(currentPercentage);
                }
            }, 10);

            return () => clearInterval(interval);
        }
    }, [showResult, score, totalFlashcards]);
    console.log("rerender");
    return (
        <div className="background">
            <div className="top">
                <h1 className="header-text">LearnThat</h1>
                <div className="right-text">
                    <Link to="/Home">Home</Link>
                    <Link to="/Quiz">Quiz</Link>
                    <a href="#" className="icon-link">
                        <CiSettings className="icon" />
                    </a>
                </div>
            </div>

            <div className="content-container">
                <div className="rectangle">
                    <div className="checkbox-container">
                        <ul>
                            {selectedLanguages.map(
                                (selected, languageIndex) => (
                                    <div
                                        className="group-container"
                                        key={languageIndex + " " + selected}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selected}
                                            onChange={handleCheckboxChange(
                                                languageIndex
                                            )}
                                        />
                                        {languages[languageIndex]}
                                    </div>
                                )
                            )}
                        </ul>
                    </div>
                </div>
                <div className="rightpart">
                    {!quizComplete && (
                        <>
                            <div className="progress-container">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>

                            <div
                                className={`flashcard ${
                                    isFlipped ? "flipped" : ""
                                }`}
                                onClick={toggleFlip}
                            >
                                <div className="front">
                                    {
                                        filteredFlashcards[currentFlashcard]
                                            .originalText
                                    }
                                </div>
                                <div className="back">
                                    {
                                        filteredFlashcards[currentFlashcard]
                                            .translatedText
                                    }
                                </div>
                            </div>

                            <div className="rightbottom">
                                <div
                                    className="dontknow"
                                    onClick={() => handleNextFlashcard(false)}
                                >
                                    Forgot it <RxCross2 className="icon2" />
                                </div>
                                <div
                                    className="knowit"
                                    onClick={() => handleNextFlashcard(true)}
                                >
                                    Learned it <FaCheck className="icon3" />
                                </div>
                            </div>
                        </>
                    )}

                    {showResult && (
                        <div className="result-container">
                            <div className="Your-scoreis">Your score is: </div>
                            {/* Animated CircleProgress display for the score */}
                            <div className="graph-containerQ">
                                <CircleProgress
                                    percentage={progress}
                                    strokeWidth={14}
                                    primaryColor={["#3AB4C5", "#326FB1"]}
                                    secondaryColor={"#e6ebe4"}
                                    fontSize={"25"}
                                />
                            </div>
                            {/* Conditional Display based on Score */}
                            {score === totalFlashcards && (
                                <div className="A-good-quote">Perfect!</div>
                            )}
                            {score > totalFlashcards * 0.8 &&
                                score < totalFlashcards && (
                                    <div className="A-good-quote">
                                        Great Job, one more step to perfect
                                    </div>
                                )}
                            {score >= totalFlashcards * 0.6 &&
                                score <= totalFlashcards * 0.8 && (
                                    <div className="A-good-quote">
                                        Good effort, keep trying!
                                    </div>
                                )}
                            {score < totalFlashcards * 0.6 && (
                                <div className="A-good-quote">
                                    You will get there soon!
                                </div>
                            )}

                            <div className="try-again" onClick={handleTryAgain}>
                                Try again
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Quiz;
