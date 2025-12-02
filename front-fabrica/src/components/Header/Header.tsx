import './Header.css';
import UserInfo from '../UserInfo/UserInfo';

interface HeaderProps {
  title?: string;
}

export default function Header({ title = 'Sistema de Café' }: HeaderProps) {
  return (
    <header className="home-header">
      <h1>{title}</h1>
      <UserInfo />
    </header>
  );
}

