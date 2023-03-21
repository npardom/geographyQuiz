import USAlogo from "../assets/USA.png";
import COLlogo from "../assets/COL.png";
import { useNavigate } from "react-router-dom";

function StartPage() {
    const navigate = useNavigate();

    function goToUSA(){
        navigate('/US-Quiz');
    }

    function goToCOL(){
        navigate('/COL-Quiz');
    }

  return (
    <div className ="background first">
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
        </div>
    </div>
    </div>
  )
}

export default StartPage