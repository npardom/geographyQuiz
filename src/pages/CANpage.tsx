import { useState, useEffect } from 'react'
import CANMap from '../components/CANMap'
import {provinces, territories, rightNames} from "../assets/provincesList";
import useSound from 'use-sound';
import yes from '../assets/yes.mp3';
import no from '../assets/no.mp3';  
import special from '../assets/special.mp3'; 
import intro from '../assets/intro.mp3';  
import done from '../assets/done.mp3';  
import TopButtons from '../components/TopButtons';

function CANpage() {
  const [playYes] = useSound(yes);
  const [playNo] = useSound(no);
  const [playSpecial] = useSound(special);
  const [playIntro] = useSound(intro);
  const [playDone] = useSound(done);
  const [warning, setWarning] = useState("");
  const [count, setCount] = useState(10);
  const [count2, setCount2] = useState(3);
  const [statesChecked, setStatesChecked] = useState<string[]>([]);
  const [citiesChecked, setCitiesChecked] = useState<string[]>([]);

  const getInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWarning("");
    var temporaryState = event.target.value.toLowerCase().trim();
    if (temporaryState in provinces) {
      event.target.value = "";
      var abbreviation = provinces[temporaryState]; 
      if (statesChecked.includes(abbreviation)) {
        playNo();
        setWarning("You already have " + rightNames[abbreviation]);
      } else {
        if(count > 1 || count2 > 1){
          playYes();
        }
        document.getElementById(abbreviation)?.classList.add("stateDiscovered3");
        setCount(count - 1);
        setStatesChecked(statesChecked.concat([abbreviation]));
      }
    } else if (temporaryState in territories){
      event.target.value = "";
      var abbreviation = territories[temporaryState];
      if (citiesChecked.includes(abbreviation)) {
        playNo();
        setWarning("You already have " + rightNames[abbreviation]);
      } else {
        if(count > 1 || count2 > 1){
          playSpecial();
        }
        document.getElementById(abbreviation)?.classList.add("stateDiscovered3");
        setCount2(count2 - 1);
        setCitiesChecked(citiesChecked.concat([abbreviation]));
      }
    }
  }

  function refreshQuiz(){
    playIntro();
    setWarning("");
    (document.getElementById("inputTextBox") as HTMLInputElement).value = "";
    setCount(10);
    setCount2(3);
    setCitiesChecked([]);
    setStatesChecked([]);
    // Erase colors on map
    var elements: any = [];
    elements = document.getElementById("allStates")?.children;
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('stateDiscovered3');
      elements[i].classList.add('stateNotDiscovered');
    }
  }

  useEffect(()=>{
    if (count == 0 && count2 == 0) {
      playDone();
    }
  }, [count, count2]);

  useEffect(()=>{
    document.body.className = '';
    document.body.classList.add('canBackground');
  }, []);
  
  return (
    <div className ="appContainer">
      <TopButtons refresh = {refreshQuiz}/>
    <div className="App">
      <h1 className = "title">Provinces of Canada</h1>
      <p className ="description">Let's see how many provinces you can remember.</p>
      <CANMap/>
      <div className="card">
      <input 
        id ="inputTextBox"
        onChange={getInput}
        autoFocus
        placeholder = "Write the province name"
        className = {count > 0 || count2 > 0 ? "inputBox":"notInputBox" }>
      </input>
        <div className = {count > 0 || count2 > 0 ? "missingCount" : "doneCard"}>
          { count > 1 && count2 == 0 ? "You are missing " + count + " provinces." 
          : count == 1 && count2 == 0 ? "You are missing " + count + " province." 
          : count > 1 && count2 > 1 ? "You are missing " + count + " provinces and "+ count2 + " territories." 
          : count == 1 && count2 > 1 ? "You are missing " + count + " province and "+ count2 + " territories." 
          : count > 1 && count2 == 1 ? "You are missing " + count + " provinces and "+ count2 + " territory." 
          : count == 1 && count2 == 1 ? "You are missing " + count + " province and "+ count2 + " territory." 
          : count == 0 && count2 > 1 ? "You are missing " + count2 + " territories." 
          : count == 0 && count2 == 1 ? "You are missing " + count2 + " territory." 
          : "You did it!"}
        </div>
        <div className = {warning ? "badWarning2":"warningNot" }>
          <b>{warning}</b>
          </div>
      </div>
    </div>
    </div>
  )
}

export default CANpage