import { useState, useEffect } from 'react'
import FRAMap from '../components/FRAMap'
import {regions, rightNames} from "../assets/regionsList";
import useSound from 'use-sound';
import yes from '../assets/yes.mp3';
import no from '../assets/no.mp3';   
import intro from '../assets/intro.mp3';  
import done from '../assets/done.mp3';  
import TopButtons from '../components/TopButtons';

function FRApage() {
  const [playYes] = useSound(yes);
  const [playNo] = useSound(no);
  const [playIntro] = useSound(intro);
  const [playDone] = useSound(done);
  const [warning, setWarning] = useState("");
  const [count, setCount] = useState(18);
  const [statesChecked, setStatesChecked] = useState<string[]>([]);

  const getInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWarning("");
    var temporaryState = event.target.value.toLowerCase().trim();
    if (temporaryState in regions) {
      event.target.value = "";
      var abbreviation = regions[temporaryState]; 
      if (statesChecked.includes(abbreviation)) {
        playNo();
        setWarning("You already have " + rightNames[abbreviation]);
      } else {
        if(count > 1){
          playYes();
        }
        document.getElementById(abbreviation)?.classList.add("stateDiscovered3");
        setCount(count - 1);
        setStatesChecked(statesChecked.concat([abbreviation]));
      }
    }
  }

  function refreshQuiz(){
    playIntro();
    (document.getElementById("inputTextBox") as HTMLInputElement).value = "";
    setWarning("");
    setCount(18);
    setStatesChecked([]);
    // Erase colors on map
    var elements: any = [];
    elements = document.getElementById("allStates")?.children;
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('stateDiscovered3');
      elements[i].classList.add('stateNotDiscovered');
    }
  }

  function TextInput() {
    return <input 
        id ="inputTextBox"
        onChange={getInput}
        autoFocus
        placeholder = "Write the region name"
        className = {count > 0 ? "inputBox":"notInputBox" }>
      </input>
  }

  useEffect(()=>{
    if (count == 0) {
      playDone();
    }
  }, [count]);

  useEffect(()=>{
    document.body.className = '';
    document.body.classList.add('fraBackground');
  }, []);
  
  return (
    <div className ="appContainer">
      <TopButtons refresh = {refreshQuiz}/>
    <div className="App">
      <h1 className = "title">Regions of France</h1>
      <p className ="description">Let's see how many regions you can remember.</p>
      <FRAMap/>
      <div className="card">
        <TextInput/>
        <div className = {count > 0 ? "missingCount" : "doneCard"}>
          {count > 0 ? "You are missing " + count + " region(s)." : "You did it!"}
        </div>
        <div className = {warning ? "badWarning":"warningNot" }>
          <b>{warning}</b>
          </div>
      </div>
    </div>
    </div>
  )
}

export default FRApage