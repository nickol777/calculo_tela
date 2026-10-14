import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Toalla from './components/Toalla/Toalla';
import Empaque from './components/Empaque/Empaque';
import Poncho from './components/Poncho/Poncho';
import Turbante from './components/Turbante/Turbante';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/toalla" element={<Toalla />} />
      <Route path="/empaque" element={<Empaque />} />
      <Route path="/poncho" element={<Poncho />} />
      <Route path="/turbante" element={<Turbante />} />
    </Routes>
  );
}

export default App;
