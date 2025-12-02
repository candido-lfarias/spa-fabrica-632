import './Home.css';
import '../../App.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import StatCard from '../../components/StatCard/StatCard';

export default function Home() {
  return (
    <div className="home-container">
      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="content-area">
          <div className="stats-container">
            <StatCard
              title="COMPRAS DO DIA"
              value="R$1.200,00"
              icon={
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#8d5e3c">
                  <ellipse cx="12" cy="12" rx="7" ry="9"/>
                  <path d="M9 10c0 .5.5 1 1 1s1-.5 1-1M13 10c0 .5.5 1 1 1s1-.5 1-1" stroke="#4a2c1a" strokeWidth="1" fill="none"/>
                </svg>
              }
            />
            <StatCard
              title="COMPRAS DO DIA"
              value="R$1.200,00"
              icon={
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#8d5e3c">
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                </svg>
              }
            />
            <StatCard
              title="CAFÉ MAIS VENDIDO"
              value="CAFÉ CANINO"
              icon={
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 8h10c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2z" fill="#8d5e3c"/>
                  <path d="M8 6v2M12 6v2M16 6v2" stroke="#8d5e3c" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M18 16h2v2h-2z" fill="#8d5e3c"/>
                  <path d="M5 11h12" stroke="#4a2c1a" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M10 4L9 6M14 4L15 6" stroke="#8d5e3c" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              }
            />
            <StatCard
              title="VENDAS DO DIA"
              value="R$5.232,00"
              icon={
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="16" height="16" rx="2" fill="#8d5e3c"/>
                  <path d="M8 8h8M8 12h8M8 16h5" stroke="#4a2c1a" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="17" cy="7" r="2" fill="#4a2c1a"/>
                </svg>
              }
            />
          </div>

          <div className="charts-area">
            {/* Área reservada para gráficos */}
          </div>
        </div>
      </div>
    </div>
  );
}
