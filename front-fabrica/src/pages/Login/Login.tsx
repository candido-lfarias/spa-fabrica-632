import { useNavigate } from 'react-router-dom';
import './Login.css';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import LoginForm from '../../components/LoginForm/LoginForm';
import LoginImageSection from '../../components/LoginImageSection/LoginImageSection';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="container">
      <div className="login-section">
        <LoginHeader />
        <LoginForm onSubmit={handleSubmit} />
      </div>

      <LoginImageSection />
    </div>
  );
}
