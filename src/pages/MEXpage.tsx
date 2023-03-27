import { useState, useEffect } from 'react'
import MEXMap from '../components/MEXMap'
import {states, rightNames} from "../assets/mexicoStatesList";
import useSound from 'use-sound';
import yes from '../assets/yes.mp3';
import no from '../assets/no.mp3';  
import special from '../assets/special.mp3'; 
import intro from '../assets/intro.mp3';  
import done from '../assets/done.mp3';  
import TopButtons from '../components/TopButtons';

function MEXpage() {
  const [playYes] = useSound(yes);
  const [playNo] = useSound(no);
  const [playSpecial] = useSound(special);
  const [playIntro] = useSound(intro);
  const [playDone] = useSound(done);
  const [warning, setWarning] = useState("");
  const [capitalChecked, setCapitalChecked] = useState(false);
  const [count, setCount] = useState(31);
  const [statesChecked, setStatesChecked] = useState<string[]>([]);

  const getInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWarning("");
    var temporaryState = event.target.value.toLowerCase().trim();
    if (temporaryState in states) {
      event.target.value = "";
      var abbreviation = states[temporaryState]; 
      if (statesChecked.includes(abbreviation)) {
        playNo();
        setWarning("You already have " + rightNames[abbreviation]);
      } else {
        if(count > 1 || !capitalChecked){
          playYes();
        }
        document.getElementById(abbreviation)?.classList.add("stateDiscovered4");
        setCount(count - 1);
        setStatesChecked(statesChecked.concat([abbreviation]));
      }
    } else if (temporaryState == "ciudad de méxico" || temporaryState == "ciudad de mexico" || temporaryState == "cdmx" || temporaryState == "distrito federal" ){
      event.target.value = "";
      setCapitalChecked(true);
      document.getElementById("CDMX")?.classList.add("stateDiscovered4");
      if (count > 0){
        playSpecial();
        setWarning("You found the capital!");
      }
    };
  }

  function refreshQuiz(){
    playIntro();
    (document.getElementById("inputTextBox") as HTMLInputElement).value = "";
    setWarning("");
    setCount(31);
    setCapitalChecked(false);
    setStatesChecked([]);
    // Erase colors on map
    var elements: any = [];
    elements = document.getElementById("allStates")?.children;
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('stateDiscovered4');
      elements[i].classList.add('stateNotDiscovered');
    }
  }

  useEffect(()=>{
    if (count == 0 && capitalChecked) {
      playDone();
    }
  }, [count, capitalChecked]);

  useEffect(()=>{
    document.body.className = '';
    document.body.classList.add('mexBackground');
  }, []);
  
  return (
    <div className ="appContainer">
      <TopButtons refresh = {refreshQuiz}/>
    <div className="App">
      <h1 className = "title">States of Mexico</h1>
      <p className ="description">Let's see how many states you can remember.</p>
      <MEXMap/>
      <div className="card">
      <input 
        id ="inputTextBox"
        onChange={getInput}
        autoFocus
        placeholder = "Write the state name"
        className = {count > 0 ? "inputBox":"notInputBox" }>
      </input>
        <div className = {count > 0 || !capitalChecked ? "missingCount" : "doneCard"}>
          {count > 0 && capitalChecked? "You are missing " + count + " state(s)." : count > 0 ? "You are missing " + count + " state(s) and the capital city." : count == 0 &&  !capitalChecked ? "You are missing the capital city." : "You did it!"}
        </div>
        <div className = {warning === "You found the capital!" ? "goodWarning2" : warning ? "badWarning2":"warningNot" }>
          <b>{warning}</b>
          </div>
      </div>
    </div>
    </div>
  )
}

export default MEXpage