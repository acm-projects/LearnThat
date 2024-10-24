import { useEffect, useState } from "react";
import "./View.css";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { CiSettings } from "react-icons/ci";
import Dropdown from "./Dropdown";
import TermView from "./TermView";
import { Term } from "./Flashcard";

const data = [
    { name: "Mon", uv: 4000, pv: 2400, amt: 2400, value: 2 },
    { name: "Tue", uv: 3000, pv: 1398, amt: 2210, value: 3 },
    { name: "Wed", uv: 2000, pv: 9800, amt: 2290, value: 1 },
    { name: "Thu", uv: 2780, pv: 3908, amt: 2000, value: 2 },
    { name: "Fri", uv: 1890, pv: 4800, amt: 2181, value: 1 },
    { name: "Sat", uv: 2390, pv: 3800, amt: 2500, value: 0 },
    { name: "Sun", uv: 3490, pv: 4300, amt: 2100, value: 1 },
];

function View() {
    useEffect(() => {
        let circularProgress = document.querySelector(
                ".Circular-Progress"
            ) as HTMLElement,
            progressValue = document.querySelector(
                ".progress-value"
            ) as HTMLElement;

        let progressStartValue = 0,
            progressEndValue = 90, // Example final value
            speed = 10;

        let progress = setInterval(() => {
            progressStartValue++;

            // Updating the text and style dynamically
            progressValue.textContent = `${progressStartValue}%`;
            circularProgress.style.background = `conic-gradient(#326FB1 ${
                progressStartValue * 3.6
            }deg, #eddeed 0deg)`;

            if (progressStartValue === progressEndValue) {
                clearInterval(progress);
            }
        }, speed);
    }, []);

    const languages = ["Deutsch", "Español"];

    let terms: Term[][] = [
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
        <div className="view-screen-container">
            <div className="background">
                {" "}
                {/* This div should cover the full width */}
                <div className="top">
                    <h1 className="header-text">LearnThat</h1>
                    <div className="right-text">
                        <a href="#" className="link">
                            View
                        </a>
                        <a href="#" className="link-space">
                            Quiz
                        </a>
                        <a href="#" className="icon-link">
                            <CiSettings className="icon" />
                        </a>
                    </div>
                </div>{" "}
                {/* This is the rectangle */}
                <div className="box1">
                    <h1 className="header-text1">
                        Number of words added past week
                    </h1>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={230}>
                            <BarChart
                                data={data}
                                margin={{
                                    top: 20,
                                    right: 72,
                                    left: 20,
                                    bottom: 20,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <defs>
                                    <linearGradient
                                        id="colorUv"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="#326FB1"
                                            stopOpacity={1}
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="#3AB4C5"
                                            stopOpacity={1}
                                        />
                                    </linearGradient>
                                </defs>
                                <Bar
                                    dataKey="value"
                                    fill="url(#colorUv)"
                                    radius={[10, 10, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="box2">
                    <h1 className="header-text2">Average quiz score</h1>
                    <div className="chart-container">
                        <div className="Circular-Progress">
                            <span className="progress-value">0%</span>
                        </div>
                        <script src="my-react-app/src/Components/View/script.js"></script>
                        <div className="text">
                            <p className="number-quiz">Number of quiz taken:</p>
                            <div className="textbox1">
                                <p className="number-quiz">5</p>
                            </div>
                            <p className="highest">Highest quiz score:</p>
                            <div className="textbox2">
                                <p className="number-quiz">Adjectives</p>
                            </div>
                            <p className="lowest">Lowest quiz score:</p>
                            <div className="textbox3">
                                <p className="number-quiz">Verbs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="view-screen-term-view">
                <Dropdown
                    selectedLanguageIndex={selectedLanguageIndex}
                    onLanguageSelect={setSelectedLanguageIndex}
                >
                    {languages}
                </Dropdown>
                <TermView>{terms[selectedLanguageIndex]}</TermView>
            </div>
        </div>
    );
}

export default View;
