import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login.tsx';
import Home from './pages/Home/Home.tsx';
import Insumos from './pages/Insumos/Insumos.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/insumos" element={<Insumos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;