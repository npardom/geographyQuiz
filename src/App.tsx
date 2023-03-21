import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import './index.css'
import USpage from './pages/USpage';
import COLpage from './pages/COLpage';
import StartPage from './pages/StartPage';
import Footer from "./components/Footer";

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/US-Quiz" element={<USpage />} />
      <Route path="/COL-Quiz" element={<COLpage />} />
    </Routes>
    <Footer />
  </Router>
  )
}

export default App
