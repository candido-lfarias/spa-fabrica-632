import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login.tsx';
import Home from './pages/Home/Home.tsx';
import UserManagement from './pages/UserManagement/UserManagement.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/producao" element={<UserManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
