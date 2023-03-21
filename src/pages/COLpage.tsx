import { useState, useEffect } from 'react'
import COLMap from '../components/COLMap'
import {departments, rightNames} from "../assets/departmentsList";
import useSound from 'use-sound';
import yes from '../assets/yes.mp3';
import no from '../assets/no.mp3';  
import special from '../assets/special.mp3'; 
import intro from '../assets/intro.mp3';  
import done from '../assets/done.mp3';  
import homeIcon from "../assets/home.png";
import refreshIcon from "../assets/refresh.png";
import { useNavigate } from "react-router-dom";

function COLpage() {
  const [playYes] = useSound(yes);
  const [playNo] = useSound(no);
  const [playSpecial] = useSound(special);
  const [playIntro] = useSound(intro);
  const [playDone] = useSound(done);
  const [title, setTitle] = useState("");
  const [warning, setWarning] = useState("");
  const [capitalChecked, setCapitalChecked] = useState(false);
  const [count, setCount] = useState(32);
  const [statesChecked, setStatesChecked] = useState<string[]>([]);
  const navigate = useNavigate(); 

  const getInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setWarning("");
    var temporaryState = event.target.value.toLowerCase();
    if (temporaryState in departments) {
      setTitle("");
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
      setTitle("");
      setCapitalChecked(true);
      document.getElementById("dc")?.classList.add("stateDiscovered2");
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

  function TextInput() {
    if (count > 0 || !capitalChecked ) {
      return (
      <input 
        onChange={getInput}
        value={title}
        autoFocus
        className = "inputBox" 
        placeholder = "Write the department name">
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

  useEffect(()=>{
    document.body.className = '';
    document.body.classList.add('colBackground');
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
      <h1 className = "title">Departments of Colombia</h1>
      <p className ="description">Let's see how many departments you can remember.</p>
      <COLMap/>
      <div className="card">
        <TextInput/>
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