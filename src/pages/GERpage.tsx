import { useState, useEffect } from 'react'
import GERMap from '../components/GERMap'
import {states, rightNames} from "../assets/germanyStatesList";
import useSound from 'use-sound';
import yes from '../assets/yes.mp3';
import no from '../assets/no.mp3';   
import intro from '../assets/intro.mp3';  
import done from '../assets/done.mp3';  
import TopButtons from '../components/TopButtons';

function GERpage() {
  const [playYes] = useSound(yes);
  const [playNo] = useSound(no);
  const [playIntro] = useSound(intro);
  const [playDone] = useSound(done);
  const [warning, setWarning] = useState("");
  const [sachsen, setSachsen] = useState(false);
  const [count, setCount] = useState(16);
  const [statesChecked, setStatesChecked] = useState<string[]>([]);
  
  const getInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWarning("");
    var temporaryState = event.target.value.toLowerCase().trim();
    if (temporaryState == "sachsen" && !sachsen){
      event.target.value = "";
      var abbreviation = states[temporaryState]; 
      setSachsen(true);
      if(count > 1){
        playYes();
      }
      document.getElementById(abbreviation)?.classList.add("stateDiscovered5");
      setCount(count - 1);
      setStatesChecked(statesChecked.concat([abbreviation]));
    }else if (temporaryState == "sachsen" && sachsen){
      playNo();
      setWarning("You already have Sachsen");
    } else if (temporaryState in states && temporaryState != "sachsen") {
      event.target.value = "";
      var abbreviation = states[temporaryState]; 
      if (statesChecked.includes(abbreviation)) {
        playNo();
        setWarning("You already have " + rightNames[abbreviation]);
      } else {
        if(count > 1){
          playYes();
        }
        document.getElementById(abbreviation)?.classList.add("stateDiscovered5");
        setCount(count - 1);
        setStatesChecked(statesChecked.concat([abbreviation]));
      }
    }
  }

  function refreshQuiz(){
    playIntro();
    (document.getElementById("inputTextBox") as HTMLInputElement).value = "";
    setWarning("");
    setCount(16);
    setStatesChecked([]);
    setSachsen(false);
    // Erase colors on map
    var elements: any = [];
    elements = document.getElementById("allStates")?.children;
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('stateDiscovered5');
      elements[i].classList.add('stateNotDiscovered');
    }
  }

  useEffect(()=>{
    if (count == 0) {
      playDone();
    }
  }, [count]);

  useEffect(()=>{
    document.body.className = '';
    document.body.classList.add('gerBackground');
  }, []);
  
  return (
    <div className ="appContainer">
    <TopButtons refresh = {refreshQuiz}/>
    <div className="App">
      <h1 className = "title">States of Germany</h1>
      <p className ="description">Let's see how many states you can remember.</p>
      <GERMap/>
      <div className="card">
      <input 
        id ="inputTextBox"
        onChange={getInput}
        autoFocus
        placeholder = "Write the state name"
        className = {count > 0 ? "inputBox":"notInputBox" }>
      </input>
        <div className = {count > 0 ? "missingCount" : "doneCard"}>
          {count > 0 ? "You are missing " + count + " state(s)." : "You did it!"}
        </div>
        <div className = {warning ? "badWarning2":"warningNot" }>
          <b>{warning}</b>
          </div>
      </div>
    </div>
    </div>
  )
}

export default GERpage