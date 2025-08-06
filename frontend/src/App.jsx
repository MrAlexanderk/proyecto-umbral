import './App.css'
import './styles/styles.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Agrega más rutas luego */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
