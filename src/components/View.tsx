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
import { Link } from "react-router-dom";
// @ts-ignore
import { CircleProgress } from "react-gradient-progress";
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
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const targetPercentage = 70;
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress < targetPercentage) {
                    return prevProgress + 1;
                } else {
                    clearInterval(interval);
                    return targetPercentage;
                }
            });
        }, 20); // Adjust the speed by changing the interval time (20 ms for smooth animation)
    }, []);

    return (
        <div className="view-screen-container">
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

                {/* Section for Bar Chart */}
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

                {/* Section for Circle Progress */}
                <div className="box2">
                    <h1 className="header-text2">Average quiz score</h1>
                    <div className="chart-container">
                        {CircleProgress && (
                            <CircleProgress
                                percentage={progress}
                                strokeWidth={14}
                                primaryColor={["#3AB4C5", "#326FB1"]}
                                secondaryColor={"#fff"}
                                fontSize={25}
                            />
                        )}
                        <div className="text">
                            <p className="number-quiz">Number of quiz taken:</p>
                            <div className="textbox1">
                                <p className="number">5</p>
                            </div>
                            <p className="highest">Highest quiz score:</p>
                            <div className="textbox2">
                                <p className="number">Adjectives</p>
                            </div>
                            <p className="lowest">Lowest quiz score:</p>
                            <div className="textbox3">
                                <p className="number">Verbs</p>
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
