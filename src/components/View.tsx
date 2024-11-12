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

function View() {
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

    const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);
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

    getTermData();

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
            <div className="view-content">
                <div>
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
                        <div className="chart-container" id="chart-container2">
                            {CircleProgress && (
                                <CircleProgress
                                    percentage={progress}
                                    strokeWidth={
                                        window.innerWidth * 0.1462 * 0.06 // 20% of circle size
                                    }
                                    primaryColor={["#3AB4C5", "#326FB1"]}
                                    secondaryColor={"#fff"}
                                    fontSize={"2em"}
                                    width={window.innerWidth * 0.1462}
                                />
                            )}
                            <div className="text">
                                <p className="number-quiz">
                                    Number of quiz taken:
                                </p>
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
                    <div className="view-screen-dropdown">
                        <Dropdown
                            selectedLanguageIndex={selectedLanguageIndex}
                            onLanguageSelect={setSelectedLanguageIndex}
                        >
                            {languages}
                        </Dropdown>
                    </div>
                    <TermView>{terms[selectedLanguageIndex]}</TermView>
                </div>
            </div>
        </div>
    );
}

export default View;
