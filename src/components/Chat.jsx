import { useState } from 'react';
import vader from 'vader-sentiment';



const Chat = () => {
    const [AlertMessage, setAlertMessage] = useState("");
    // const [isVisible, setIsVisible] = useState(true);
    const [sentMessages, setsentMessages] = useState([]);
    const [isAnswered, setIsAnswered] = useState(true);
    const [currResponse, setCurrResponse] = useState("");
    const [questionsList, setquestionsList] = useState([]);
    const [isQuestion, setisQuestion] = useState(false);
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const newQuestion = () => {
        setsentMessages([]);
        setquestionsList([]);
        const category = ["math", "writing"][getRandomInt(0, 1)];
        if (category === "math") {
            const operation = ["addition", "subtraction", "multiplication", "division"][getRandomInt(0, 3)];
            let question;
            let answer;
            const ADDNUM1 = getRandomInt(0, 1000);
            const ADDNUM2 = getRandomInt(ADDNUM1, 1000);
            const MULNUM1 = getRandomInt(0, 99);
            const MULNUM2 = getRandomInt(MULNUM1, 100);
            if (operation === "addition") {
                question = `What is ${ADDNUM1} + ${ADDNUM2}?`;
                answer = ADDNUM1 + ADDNUM2;
            }

            if (operation === "subtraction") {
                question = `What is ${ADDNUM2} - ${ADDNUM1}?`;
                answer = ADDNUM2 - ADDNUM1;
            }

            if (operation === "multiplication") {
                question = `What is ${MULNUM1} * ${MULNUM2}?`;
                answer = MULNUM1 * MULNUM2;
            }

            if (operation === "division") {
                question = `What is ${MULNUM2} / ${MULNUM1}?`;
                answer = MULNUM2 / MULNUM1;
            }

            setquestionsList((prev) => [...prev, [question, answer]]);
        } else if (category === "writing") {
            const emotion = ["positive", "negative", "neutral"][getRandomInt(0, 2)];
            const question = `Write a ${emotion} short story.`;
            setquestionsList((prev) => [...prev, [question, emotion]]);
        } else if (category === "memory") {
            const number = getRandomInt(0, 10000000000);
            const question = `Remember the number ${number}.`;
            setquestionsList((prev) => [...prev, [question, number]]);
            setTimeout(() => {
                setisQuestion(true);
            }, 15000);
        }
        setIsAnswered(false);
        if (category !== "memory")
            setisQuestion(true);
    };

    const evalAns = () => {
        setsentMessages((prev) => [...prev, currResponse]);


        if (questionsList[questionsList.length - 1][1] === "positive" || questionsList[questionsList.length - 1][1] === "negative" || questionsList[questionsList.length - 1][1] === "neutral") {
            const textToAnalyze = currResponse;

            const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(textToAnalyze);

            if (intensity.compound >= 0.05 && questionsList[questionsList.length - 1][1] === "positive") {
                setIsAnswered(true);
                setisQuestion(false);
                setAlertMessage("Correct!");
            }
            else if (intensity.compound > -0.05 && intensity.compound < 0.05 && questionsList[questionsList.length - 1][1] === "neutral") {
                setIsAnswered(true);
                setisQuestion(false);
                setAlertMessage("Correct!");
            }
            else if (intensity.compound <= -0.05 && questionsList[questionsList.length - 1][1] === "negative") {
                setIsAnswered(true);
                setisQuestion(false);
                setAlertMessage("Correct!");
            }
            else
                setAlertMessage("Incorrect!");

        }
        else if (questionsList[questionsList.length - 1][1] == currResponse) {
            setIsAnswered(true);
            setisQuestion(false);
            setAlertMessage("Correct!");

        }
        else setAlertMessage("Incorrect!");

        setCurrResponse("");
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {

            evalAns();
        }
    };

    return (
        <>

            {/* {isVisible ? (
                <div className="alert">{AlertMessage}</div>
            ) : null} */}
            {AlertMessage}
            
            <h1> ChatGPT-AltVerse</h1>


            <div className="chats">
                {questionsList.map((questionSet, index) => (
                    <div className="message received" key={index}>{questionSet[0]}</div>
                ))}

                {sentMessages.map((message, index) => (
                    <div className="message sent" key={index}>{message}</div>
                ))}
            </div>
            <div className="flex">
                <button onClick={newQuestion} disabled={!isAnswered}>New Question</button>
                <input onKeyDown={handleKeyPress} type="text" placeholder="Enter your message..." onChange={(e) => setCurrResponse(e.target.value)} value={currResponse} disabled={!isQuestion} />
                <button onClick={evalAns} disabled={!isQuestion} >Send</button>
            </div>
        </>
    );
};

export default Chat;
