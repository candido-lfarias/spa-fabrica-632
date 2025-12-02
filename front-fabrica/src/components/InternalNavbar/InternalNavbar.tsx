import { Link, useLocation } from 'react-router-dom';
import './InternalNavbar.css';

interface NavItem {
  path: string;
  label: string;
}

interface InternalNavbarProps {
  items: NavItem[];
}

export default function InternalNavbar({ items }: InternalNavbarProps) {
  const location = useLocation();

  return (
    <nav className="internal-navbar">
      {items.map((item) => (
        <Link 
          key={item.path}
          to={item.path} 
          className={location.pathname === item.path ? 'active' : ''}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

