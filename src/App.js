
import './App.css';
import React, { useState, useRef } from 'react';

function App() {
  const boxes = [0, 1, 2, 3, 4];
  const [currId, setCurrId] = useState(null);
  const intervalId = useRef(0)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [success, setSucces] = useState(null)
  const [failure, setfailure] = useState(null)
  let timerId = useRef(0)
  const [start, setStart] = useState(false);

  const startGame = () => {
    if (intervalId.current && start) {
      // console.log("returned with intervalId.current ", intervalId.current)
      return
    }
    setStart(true)
   // console.log("started game with ", intervalId.current)
    intervalId.current = setInterval(() => {
      setCurrId(
        Math.floor(Math.random() * boxes.length) // to get the random indexes 
      )
      setSucces(null) // setState will not re render the whole component if it is updating the state with same value
    }, [1500])
  }

  const endGame = () => {
    if (!intervalId.current) {
      return
    }
    // console.log("game ends with ", intervalId.current)
    clearInterval(intervalId.current)
    intervalId.current = null
    clearTimeout(timerId.curref)

    timerId.curref = setTimeout(()=>{
      setfailure(null)
    },500);
    setCurrId(null)
    setHighScore(
      Math.max(highScore, score)
    )
    setScore(0);
    setStart(false)
  }


  function handleClick(id) {
   if(!start) return
   
    if(currId === id){
      setScore(prev => prev + 1)
      setSucces(id)
    } else if(currId !== id){
        setfailure(id)  
        endGame()
    }

  }

  return (
    <div className="App">
      <div>Score : {score}</div>
      <div>high score : {highScore}</div>
      <div className='container'>
        {boxes.map((val, id) => {
          return (
            <div
              key={id}
              className={`box ${currId === id ? 'blue' : ''} ${success === id ? 'green' : ''} ${failure === id? 'red' : ''} `}
              onClick={() => handleClick(id) }
            >
            </div>
          )
        })}
      </div>
      <button onClick={() => { startGame() }}>Start</button>
      <button onClick={() => { endGame() }}>Stop</button>
    </div>
  );
}

export default App;
