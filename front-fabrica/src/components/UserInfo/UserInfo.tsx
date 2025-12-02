import './UserInfo.css';

interface UserInfoProps {
  name?: string;
  email?: string;
}

export default function UserInfo({ 
  name = 'Admin', 
  email = 'administrador@gmail.com' 
}: UserInfoProps) {
  return (
    <section className="user-info">
      <div className="user-details">
        <span className="user-name">{name}</span>
        <span className="user-email">{email}</span>
      </div>
      <div className="user-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="8" r="4" stroke="#4a2c1a" strokeWidth="2" fill="none"/>
          <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="#4a2c1a" strokeWidth="2" fill="none"/>
        </svg>
      </div>
    </section>
  );
}

