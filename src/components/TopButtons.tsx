import homeIcon from "../assets/home.png";
import refreshIcon from "../assets/refresh.png";
import { useNavigate } from "react-router-dom";

function TopButtons({refresh}:any) {
    const navigate = useNavigate();
    
    function goToHome(){
        navigate('/');
    }
    
    return (
    <>
    <button className = "buttonTop goHome" onClick={goToHome}>
        <img src={homeIcon} className = "buttonIcon"/>
        <div className ="buttonText">Main Page</div>
      </button>
      <button className = "buttonTop refresh" onClick={refresh}>
        <div className ="buttonText">Restart</div>
        <img src={refreshIcon} className = "buttonIcon"/>
      </button>
    </>
  )
}

export default TopButtons