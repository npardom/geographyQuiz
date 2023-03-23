import { useState, useEffect } from 'react'
import COLMap from '../components/COLMap'
import {departments, rightNames} from "../assets/departmentsList";
import useSound from 'use-sound';
import yes from '../assets/yes.mp3';
import no from '../assets/no.mp3';  
import special from '../assets/special.mp3'; 
import intro from '../assets/intro.mp3';  
import done from '../assets/done.mp3';  
import TopButtons from '../components/TopButtons';

function COLpage() {
  const [playYes] = useSound(yes);
  const [playNo] = useSound(no);
  const [playSpecial] = useSound(special);
  const [playIntro] = useSound(intro);
  const [playDone] = useSound(done);
  const [warning, setWarning] = useState("");
  const [capitalChecked, setCapitalChecked] = useState(false);
  const [count, setCount] = useState(32);
  const [statesChecked, setStatesChecked] = useState<string[]>([]);

  const getInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWarning("");
    var temporaryState = event.target.value.toLowerCase().trim();
    if (temporaryState in departments) {
      event.target.value = "";
      var abbreviation = departments[temporaryState]; 
      if (statesChecked.includes(abbreviation)) {
        playNo();
        setWarning("You already have " + rightNames[abbreviation]);
      } else {
        if(count > 1 || !capitalChecked){
          playYes();
        }
        document.getElementById(abbreviation)?.classList.add("stateDiscovered2");
        setCount(count - 1);
        setStatesChecked(statesChecked.concat([abbreviation]));
      }
    } else if (temporaryState == "bogota" || temporaryState == "bogotá"){
      event.target.value = "";
      setCapitalChecked(true);
      document.getElementById("dc")?.classList.add("stateDiscovered2");
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
    setCount(32);
    setCapitalChecked(false);
    setStatesChecked([]);
    // Erase colors on map
    var elements: any = [];
    elements = document.getElementById("allStates")?.children;
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('stateDiscovered2');
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
    document.body.classList.add('colBackground');
  }, []);
  
  return (
    <div className ="appContainer">
      <TopButtons refresh = {refreshQuiz}/>
    <div className="App">
      <h1 className = "title">Departments of Colombia</h1>
      <p className ="description">Let's see how many departments you can remember.</p>
      <COLMap/>
      <div className="card">
      <input 
        id ="inputTextBox"
        onChange={getInput}
        autoFocus
        placeholder = "Write the department name"
        className = {count > 0 ? "inputBox":"notInputBox" }>
      </input>
        <div className = {count > 0 || !capitalChecked ? "missingCount" : "doneCard"}>
          {count > 0 && capitalChecked? "You are missing " + count + " department(s)." : count > 0 ? "You are missing " + count + " department(s) and the capital city." : count == 0 &&  !capitalChecked ? "You are missing the capital city." : "You did it!"}
        </div>
        <div className = {warning === "You found the capital!" ? "goodWarning2" : warning ? "badWarning2":"warningNot" }>
          <b>{warning}</b>
          </div>
      </div>
    </div>
    </div>
  )
}

export default COLpage