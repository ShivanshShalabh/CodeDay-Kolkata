import Chat from './components/Chat';
import Input from './components/Input';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const newQuestion = () => {
    const SUB = ["math", "writing", "memory"][Math.floor((Math.random() - .01) * 3)];
    switch (SUB) {
      case "math":
        switch (["addition", "subtraction", "multiplication", "division"][Math.floor((Math.random() - .01) * 4)]) {
          case "addition":
            setquestionsList([...questionsList, `What is ${Math.floor((Math.random() - .01) * 1000)} + ${Math.floor((Math.random() - .01) * 100)}?`]);
            break;
          case "subtraction":
            setquestionsList([...questionsList, `What is ${Math.floor((Math.random() - .01) * 100)} - ${Math.floor((Math.random() - .01) * 100)}?`]);
            break;
          case "multiplication":
            setquestionsList([...questionsList, `What is ${Math.floor((Math.random() - .01) * 100)} * ${Math.floor((Math.random() - .01) * 100)}?`]);
            break;
          case "division":
            setquestionsList([...questionsList, `What is ${Math.floor((Math.random() - .01) * 100)} / ${Math.floor((Math.random() - .01) * 100)}?`]);
            break;

          case "writing":
            
            setquestionsList([...questionsList, `Write a short story that expresses the emotion ${["happy", "sad", "angry", "confused"][Math.floor((Math.random() - .01) * 4)]}.`]);
            break;
          case "memory":
            setquestionsList([...questionsList, `Remember the number ${ Math.floor((Math.random() - .01) * 10000000000)}.`]);
            break;
          default:
            break;


        }
    }
  }
    newQuestion();
    const [questionsList, setquestionsList] = useState([]);

    useEffect(() => {
      setquestionsList(["What is your name?"]);
    }, []);

    return (
      <div className="chat-box">
        <Chat questions={JSON.stringify(questionsList)} />
        <Input />
      </div>
    );
  }

  export default App;
