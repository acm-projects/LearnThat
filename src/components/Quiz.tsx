import { useState, useEffect } from "react";
import "./Quiz.css";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
// @ts-ignore
import { CircleProgress } from "react-gradient-progress";

const Quiz = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("Japanese");

    const [selectedTypes, setSelectedTypes] = useState<{
        [key: string]: boolean;
    }>({
        Adjectives: true,
        Nouns: false,
    });

    const [currentFlashcard, setCurrentFlashcard] = useState(0);
    const [score, setScore] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [quizComplete, setQuizComplete] = useState(false);

    const flashcardsData: {
        [key: string]: { [key: string]: { [key: string]: string }[] };
    } = {
        Japanese: {
            Adjectives: [
                {
                    front: "Japanese Adjective 1 - Front",
                    back: "Japanese Adjective 1 - Back",
                },
                {
                    front: "Japanese Adjective 2 - Front",
                    back: "Japanese Adjective 2 - Back",
                },
            ],
            Nouns: [
                {
                    front: "Japanese Noun 1 - Front",
                    back: "Japanese Noun 1 - Back",
                },
                {
                    front: "Japanese Noun 2 - Front",
                    back: "Japanese Noun 2 - Back",
                },
            ],
        },
        English: {
            Adjectives: [
                {
                    front: "English Adjective 1 - Front",
                    back: "English Adjective 1 - Back",
                },
                {
                    front: "English Adjective 2 - Front",
                    back: "English Adjective 2 - Back",
                },
            ],
            Nouns: [
                {
                    front: "English Noun 1 - Front",
                    back: "English Noun 1 - Back",
                },
                {
                    front: "English Noun 2 - Front",
                    back: "English Noun 2 - Back",
                },
            ],
        },
    };

    const languages = ["日本語", "English", "Français", "español"];

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const language = e.target.value;
        setSelectedLanguage(language);
        setCurrentFlashcard(0);
    };

    const handleCheckboxChange =
        (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setSelectedTypes((prev) => ({
                ...prev,
                [type]: e.target.checked,
            }));
        };

    const getFilteredFlashcards = () => {
        const types = Object.keys(selectedTypes).filter(
            (type) => selectedTypes[type as keyof typeof selectedTypes]
        ) as (keyof typeof selectedTypes)[];

        return types.flatMap(
            (type) => flashcardsData[selectedLanguage]?.[type] || []
        );
    };

    const filteredFlashcards = getFilteredFlashcards();
    const totalFlashcards = filteredFlashcards.length;

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
                    <div className="dropdown-container">
                        <select
                            value={selectedLanguage}
                            onChange={handleLanguageChange}
                            className="language-dropdown"
                        >
                            {languages.map((language, index) => (
                                <option key={index} value={language}>
                                    {language}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="checkbox-container">
                        {Object.keys(selectedTypes).map((type) => (
                            <div className="group-container" key={type}>
                                <input
                                    type="checkbox"
                                    checked={
                                        selectedTypes[
                                            type as keyof typeof selectedTypes
                                        ]
                                    }
                                    onChange={handleCheckboxChange(type)}
                                />
                                {type}
                            </div>
                        ))}
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
                                            ?.front
                                    }
                                </div>
                                <div className="back">
                                    {filteredFlashcards[currentFlashcard]?.back}
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
