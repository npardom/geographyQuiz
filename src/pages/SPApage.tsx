import { useState, useEffect } from 'react'
import SPAMap from '../components/SPAMap'
import {communities, cities, rightNames} from "../assets/communitiesList";
import useSound from 'use-sound';
import yes from '../assets/yes.mp3';
import no from '../assets/no.mp3';  
import special from '../assets/special.mp3'; 
import intro from '../assets/intro.mp3';  
import done from '../assets/done.mp3';  
import TopButtons from '../components/TopButtons';

function SPApage() {
  const [playYes] = useSound(yes);
  const [playNo] = useSound(no);
  const [playSpecial] = useSound(special);
  const [playIntro] = useSound(intro);
  const [playDone] = useSound(done);
  const [warning, setWarning] = useState("");
  const [count, setCount] = useState(17);
  const [count2, setCount2] = useState(2);
  const [statesChecked, setStatesChecked] = useState<string[]>([]);
  const [citiesChecked, setCitiesChecked] = useState<string[]>([]);

  const getInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWarning("");
    var temporaryState = event.target.value.toLowerCase().trim();
    if (temporaryState in communities) {
      event.target.value = "";
      var abbreviation = communities[temporaryState]; 
      if (statesChecked.includes(abbreviation)) {
        playNo();
        setWarning("You already have " + rightNames[abbreviation]);
      } else {
        if(count > 1 || count2 >= 1){
          playYes();
        }
        document.getElementById(abbreviation)?.classList.add("stateDiscovered3");
        setCount(count - 1);
        setStatesChecked(statesChecked.concat([abbreviation]));
      }
    } else if (temporaryState in cities){
      event.target.value = "";
      var abbreviation = cities[temporaryState];
      if (citiesChecked.includes(abbreviation)) {
        playNo();
        setWarning("You already have " + rightNames[abbreviation]);
      } else {
        if(count >= 1 || count2 > 1){
          playSpecial();
        }
        document.getElementById(abbreviation)?.classList.add("stateDiscovered3");
        setCount2(count2 - 1);
        setCitiesChecked(citiesChecked.concat([abbreviation]));
      }
    };
  }

  function refreshQuiz(){
    playIntro();
    (document.getElementById("inputTextBox") as HTMLInputElement).value = "";
    setWarning("");
    setCount(17);
    setCount2(2);
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
    document.body.classList.add('spaBackground');
  }, []);
  
  return (
    <div className ="appContainer">
      <TopButtons refresh = {refreshQuiz}/>
    <div className="App">
      <h1 className = "title">Communities of Spain</h1>
      <p className ="description">Let's see how many communities you can remember.</p>
      <SPAMap/>
      <div className="card">
      <input 
        id ="inputTextBox"
        onChange={getInput}
        autoFocus
        placeholder = "Write the community name"
        className = {count > 0 || count2 > 0 ? "inputBox":"notInputBox" }>
      </input>
        <div className = {count > 0 || count2 > 0 ? "missingCount" : "doneCard"}>
          {count > 1 && count2 == 0 ? "You are missing " + count + " communities." 
          : count == 1 && count2 == 0 ? "You are missing " + count + " community." 
          : count > 1 && count2 > 1 ? "You are missing " + count + " communities and "+ count2 + " cities." 
          : count == 1 && count2 > 1 ? "You are missing " + count + " community and "+ count2 + " cities." 
          : count > 1 && count2 == 1 ? "You are missing " + count + " communities and "+ count2 + " city." 
          : count == 1 && count2 == 1 ? "You are missing " + count + " community and "+ count2 + " city." 
          : count == 0 && count2 > 1 ? "You are missing " + count2 + " cities." 
          : count == 0 && count2 == 1 ? "You are missing " + count2 + " city." 
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

export default SPApage