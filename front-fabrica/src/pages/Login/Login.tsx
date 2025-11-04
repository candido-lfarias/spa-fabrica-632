import './Login.css';
import cafeImage from '../../assets/cafe.png';
import { useState } from 'react';

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Login bem-sucedido! Token: ${data.token}`);
        localStorage.setItem("token", data.token);
      } else {
        setMessage(data.message || "Erro no login");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(`Erro: ${err.message}`);
      } else {
        setMessage("Erro de conexão com o servidor");    }
  }
}

  return (
    <div className="container">
      <div className="login-section">
        <h1 className="title">CAFÉ</h1>
        <h2 className="subtitle">AU CARAMELO</h2>
        <p className="slogan">UM CAFÉ GOSTOSO PRA CACHORRO!</p>

        <hr className="divider" />

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Nome de usuário</label>
        <input
            type="text"
            id="username"
            placeholder="Seu usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <a href="#" className="forgot">Esqueceu sua senha?</a>

          <button type="submit">LOGIN</button>
        </form>

        {message && <p className="message">{message}</p>}

      </div>

      <div className="image-section">
        <img src={cafeImage} alt="Café au Caramelo" />
      </div>
    </div>  
  );  
}