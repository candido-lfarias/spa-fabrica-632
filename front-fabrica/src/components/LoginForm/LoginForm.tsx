import './LoginForm.css';

interface LoginFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  return (
    <form className="login-form" onSubmit={onSubmit}>
      <label htmlFor="email">E-mail</label>
      <input type="email" id="email" placeholder="Seu email" required />

      <label htmlFor="password">Senha</label>
      <input type="password" id="password" placeholder="Sua senha" required />

      <a href="#" className="forgot">Esqueceu sua senha?</a>

      <button type="submit">ENTRAR</button>
    </form>
  );
}

