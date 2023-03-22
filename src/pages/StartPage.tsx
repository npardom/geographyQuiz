import USAlogo from "../assets/USA.png";
import COLlogo from "../assets/COL.png";
import FRAlogo from "../assets/FRA.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'

function StartPage() {
    const navigate = useNavigate();

    function goToUSA(){
        navigate('/US-Quiz');
    }

    function goToCOL(){
        navigate('/COL-Quiz');
    }

    function goToFRA(){
        navigate('/FRA-Quiz');
    }

    useEffect(()=>{
        document.body.className = '';
        document.body.classList.add('firstBackground');
    }, []);
    

  return (
    <div className ="appContainer">
    <div className="App">
        <h1 className = "welcomeTitle">Welcome</h1>
        <p className = "description1"> Select a country to start</p>
        <div className= "buttonContainer">
            <div className = "countryButton" onClick={goToUSA}>
                <div className ="innerContainer">
                    <img src={USAlogo} className = "countryLogo"/>
                    United States
                </div>
            </div>
            <div className = "countryButton" onClick={goToCOL}>
                <div className ="innerContainer">
                    <img src={COLlogo} className = "countryLogo"/>
                    Colombia
                </div>
            </div>
            <div className = "countryButton" onClick={goToFRA}>
                <div className ="innerContainer">
                    <img src={FRAlogo} className = "countryLogo"/>
                    France
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default StartPage