import './Home.css';
import '../../App.css';

export default function Home() {
  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <img src="../assets/logo.png" alt="Logo Café" className="logo" />
        </div>
        <ul className="sidebar-menu">
          <li><a href="/home">Home</a></li>
          <li><a href="/compras">Compras</a></li>
          <li><a href="/vendas">Vendas</a></li>
          <li><a href="/clientes">Clientes</a></li>
          <li><a href="/fornecedores">Fornecedores</a></li>
          <li><a href="/produtos">Produtos</a></li>
        </ul>
      </div>

      <div className="main-content">
        <header className="home-header">
          <h1>Sistema de Café</h1>
        <section className="user-info">
          <div className="user-profile">
            <img src="path_to_user_image.jpg" alt="Admin" className="user-photo" />
            <div className="user-details">
              <h2>Admin</h2>
              <p>admin@cafecaramelo.com</p>
            </div>
          </div>
        </section>
        </header>

        <section className="intro">
          <button className="btn-explore">Explore nossos produtos</button>
        </section>

        <div className="stats-container">
          <div className="stat-card">
            <h2>Compras do Dia</h2>
            <p className="stat-value">R$1.200,00</p>
          </div>
          <div className="stat-card">
            <h2>Vendas do Dia</h2>
            <p className="stat-value">R$5.232,00</p>
          </div>
          <div className="stat-card">
            <h2>Café Mais Vendido</h2>
            <p className="stat-value">Café Canino</p>
          </div>
          <div className="stat-card">
            <h2>Produção Diária</h2>
            <p className="stat-value">R$10.000,00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
