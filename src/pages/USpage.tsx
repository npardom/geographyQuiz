import { useState, useEffect } from 'react'
import USMap from '../components/USMap'
import {states} from "../assets/statesList";
import useSound from 'use-sound';
import yes from '../assets/yes.mp3';
import no from '../assets/no.mp3';   
import special from '../assets/special.mp3'; 
import intro from '../assets/intro.mp3';  
import done from '../assets/done.mp3'; 
import homeIcon from "../assets/home.png";
import refreshIcon from "../assets/refresh.png";
import { useNavigate } from "react-router-dom";

function USpage() {
  const [playYes] = useSound(yes);
  const [playNo] = useSound(no);
  const [playSpecial] = useSound(special);
  const [playIntro] = useSound(intro);
  const [playDone] = useSound(done);
  const [title, setTitle] = useState("");
  const [warning, setWarning] = useState("");
  const [count, setCount] = useState(50);
  const [capitalChecked, setCapitalChecked] = useState(false);
  const [statesChecked, setStatesChecked] = useState<string[]>([]);
  const navigate = useNavigate(); 

  const getInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setWarning("");
    var temporaryState = event.target.value.toLowerCase();
    if (temporaryState in states) {
      setTitle("");
      var abbreviation = states[temporaryState]; 
      if (statesChecked.includes(abbreviation)) {
        playNo();
        // Capitalize first letter
        const words = temporaryState.split(" ");
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].substring(1);
        }
        // Set warning
        setWarning("You already have " + words.join(" "));
      } else {
        if(count > 1 || !capitalChecked){
          playYes();
        }
        document.getElementById(abbreviation)?.classList.add("stateDiscovered");
        setCount(count - 1);
        setStatesChecked(statesChecked.concat([abbreviation]));
      }
    } else if (temporaryState == "d.c." || temporaryState == "dc" || temporaryState == "district of columbia" ){
      setTitle("");
      setCapitalChecked(true);
      document.getElementById("dc")?.classList.add("stateDiscovered");
      if (count > 0){
        playSpecial();
        setWarning("You found the capital!");
      }
    };
  }

  function goToHome(){
    navigate('/');
  }

  function refreshQuiz(){
    playIntro();
    setTitle("");
    setWarning("");
    setCount(50);
    setCapitalChecked(false);
    setStatesChecked([]);
    // Erase colors on map
    var elements: any = [];
    elements = document.getElementById("allStates")?.children;
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('stateDiscovered');
      elements[i].classList.add('stateNotDiscovered');
    }
  }

  function TextInput() {
    if (count > 0 || !capitalChecked ) {
      return (
      <input 
        onChange={getInput}
        value={title}
        autoFocus
        className = "inputBox" 
        placeholder = "Write the state name">
      </input>
      )
    }else{
      return <></>
    }
  }

  useEffect(()=>{
    if (count == 0 && capitalChecked) {
      playDone();
    }
  }, [count, capitalChecked]);
  
  return (
    <div className ="background USA">
      <button className = "buttonTop goHome" onClick={goToHome}>
        <img src={homeIcon} className = "buttonIcon"/>
        <div className ="buttonText">Main Page</div>
      </button>
      <button className = "buttonTop refresh" onClick={refreshQuiz}>
        <div className ="buttonText">Restart</div>
        <img src={refreshIcon} className = "buttonIcon"/>
      </button>
    <div className="App">
      <h1 className = "title">U.S. States</h1>
      <p className ="description">Let's see how many states you can remember.</p>
      <USMap/>
      <div className="card">
        <TextInput/>
        <div className = {count > 0 || !capitalChecked ? "missingCount" : "doneCard"}>
          {count > 0 && capitalChecked? "You are missing " + count + " state(s)." : count > 0 ? "You are missing " + count + " state(s) and the capital city." : count == 0 &&  !capitalChecked ? "You are missing the capital city." : "You did it!"}
        </div>
        <div className = {warning === "You found the capital!" ? "goodWarning" : warning ? "badWarning":"warningNot" }>
          <b>{warning}</b>
        </div>
      </div>
    </div>
    </div>
  )
}

export default USpage