import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login.tsx';
import Home from './pages/Home/Home.tsx';
import Compras from './pages/Compras/Compras.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/compras" element={<Compras />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
