import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import './index.css'
import USpage from './pages/USpage';
import COLpage from './pages/COLpage';
import FRApage from './pages/FRApage';
import GERpage from './pages/GERpage';
import ITApage from './pages/ITApage';
import SPApage from './pages/SPApage';
import CANpage from './pages/CANpage';
import StartPage from './pages/StartPage';
import Footer from "./components/Footer";

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/US-Quiz" element={<USpage />} />
      <Route path="/COL-Quiz" element={<COLpage />} />
      <Route path="/FRA-Quiz" element={<FRApage />} />
      <Route path="/ITA-Quiz" element={<ITApage />} />
      <Route path="/GER-Quiz" element={<GERpage />} />
      <Route path="/SPA-Quiz" element={<SPApage />} />
      <Route path="/CAN-Quiz" element={<CANpage />} />
    </Routes>
    <Footer />
  </Router>
  )
}

export default App
