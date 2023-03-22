import { useState, useEffect } from 'react'
import ITAMap from '../components/ITAMap'
import {regions, rightNames} from "../assets/italyRegionsList";
import useSound from 'use-sound';
import yes from '../assets/yes.mp3';
import no from '../assets/no.mp3';   
import intro from '../assets/intro.mp3';  
import done from '../assets/done.mp3';  
import homeIcon from "../assets/home.png";
import refreshIcon from "../assets/refresh.png";
import { useNavigate } from "react-router-dom";

function ITApage() {
  const [playYes] = useSound(yes);
  const [playNo] = useSound(no);
  const [playIntro] = useSound(intro);
  const [playDone] = useSound(done);
  const [title, setTitle] = useState("");
  const [warning, setWarning] = useState("");
  const [count, setCount] = useState(20);
  const [statesChecked, setStatesChecked] = useState<string[]>([]);
  const navigate = useNavigate(); 

  const getInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setWarning("");
    var temporaryState = event.target.value.toLowerCase();
    if (temporaryState in regions) {
      setTitle("");
      var abbreviation = regions[temporaryState]; 
      if (statesChecked.includes(abbreviation)) {
        playNo();
        setWarning("You already have " + rightNames[abbreviation]);
      } else {
        if(count > 1){
          playYes();
        }
        document.getElementById(abbreviation)?.classList.add("stateDiscovered4");
        setCount(count - 1);
        setStatesChecked(statesChecked.concat([abbreviation]));
      }
    }
  }

  function goToHome(){
    navigate('/');
  }

  function refreshQuiz(){
    playIntro();
    setTitle("");
    setWarning("");
    setCount(20);
    setStatesChecked([]);
    // Erase colors on map
    var elements: any = [];
    elements = document.getElementById("allStates")?.children;
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('stateDiscovered4');
      elements[i].classList.add('stateNotDiscovered');
    }
  }

  function TextInput() {
    if (count > 0 ) {
      return (
      <input 
        onChange={getInput}
        value={title}
        autoFocus
        className = "inputBox" 
        placeholder = "Write the region name">
      </input>
      )
    }else{
      return <></>
    }
  }

  useEffect(()=>{
    if (count == 0) {
      playDone();
    }
  }, [count]);

  useEffect(()=>{
    document.body.className = '';
    document.body.classList.add('itaBackground');
  }, []);
  
  return (
    <div className ="appContainer">
      <button className = "buttonTop goHome" onClick={goToHome}>
        <img src={homeIcon} className = "buttonIcon"/>
        <div className ="buttonText">Main Page</div>
      </button>
      <button className = "buttonTop refresh" onClick={refreshQuiz}>
        <div className ="buttonText">Restart</div>
        <img src={refreshIcon} className = "buttonIcon"/>
      </button>
    <div className="App">
      <h1 className = "title">Regions of Italy</h1>
      <p className ="description">Let's see how many regions you can remember.</p>
      <ITAMap/>
      <div className="card">
        <TextInput/>
        <div className = {count > 0 ? "missingCount" : "doneCard"}>
          {count > 0 ? "You are missing " + count + " region(s)." : "You did it!"}
        </div>
        <div className = {warning ? "badWarning2":"warningNot" }>
          <b>{warning}</b>
          </div>
      </div>
    </div>
    </div>
  )
}

export default ITApage