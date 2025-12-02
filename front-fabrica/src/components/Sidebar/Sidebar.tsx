import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import logoImage from '../../assets/logo.png';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/compras', label: 'Compras' },
    { path: '/vendas', label: 'Vendas' },
    { path: '/clientes', label: 'Clientes' },
    { path: '/fornecedores', label: 'Fornecedores' },
    { path: '/produtos', label: 'Produtos' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logoImage} alt="Logo Café" className="logo" />
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

