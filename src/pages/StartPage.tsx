import USAlogo from "../assets/USA.png";
import COLlogo from "../assets/COL.png";
import FRAlogo from "../assets/FRA.png";
import ITAlogo from "../assets/ITA.png";
import GERlogo from "../assets/GER.png";
import SPAlogo from "../assets/SPA.png";
import CANlogo from "../assets/CAN.png";
import MEXlogo from "../assets/MEX.png";
import CountryButton from "../components/CountryButton";
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

    function goToITA(){
        navigate('/ITA-Quiz');
    }

    function goToGER(){
        navigate('/GER-Quiz');
    }

    function goToCAN(){
        navigate('/CAN-Quiz');
    }

    function goToSPA(){
        navigate('/SPA-Quiz');
    }

    function goToMEX(){
        navigate('/MEX-Quiz');
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
            <CountryButton action={goToUSA} name = "United States" image ={USAlogo}/>
            <CountryButton action={goToCOL} name = "Colombia" image ={COLlogo}/>
            <CountryButton action={goToFRA} name = "France" image ={FRAlogo}/>
            <CountryButton action={goToITA} name = "Italy" image ={ITAlogo}/>
            <CountryButton action={goToGER} name = "Germany" image ={GERlogo}/>
            <CountryButton action={goToSPA} name = "Spain" image ={SPAlogo}/>
            <CountryButton action={goToCAN} name = "Canada" image ={CANlogo}/>
            <CountryButton action={goToMEX} name = "Mexico" image ={MEXlogo}/>
        </div>
    </div>
    </div>
  )
}

export default StartPage