import { useState } from "react";
import "./App.css";

type Page = "home" | "sobre" | "contato";

function App() {
  const [page, setPage] = useState<Page>("home");

  return (
    <div className="app-container">

      <Header onNavigate={setPage} currentPage={page} />

      <main className="content">
        {page === "home" && <Home />}
        {page === "sobre" && <Sobre />}
        {page === "contato" && <Contato />}
      </main>

      <Footer />
    </div>
  );
}

// ---------------- COMPONENTES ----------------

function Header({
  onNavigate,
  currentPage,
}: {
  onNavigate: (p: Page) => void;
  currentPage: Page;
}) {
  return (
    <header className="header">
      <h1 className="title">Fábrica 632 – SPA</h1>

      <nav className="nav">
        <NavButton
          active={currentPage === "home"}
          onClick={() => onNavigate("home")}
        >
          Home
        </NavButton>

        <NavButton
          active={currentPage === "sobre"}
          onClick={() => onNavigate("sobre")}
        >
          Sobre
        </NavButton>

        <NavButton
          active={currentPage === "contato"}
          onClick={() => onNavigate("contato")}
        >
          Contato
        </NavButton>
      </nav>
    </header>
  );
}

function NavButton({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className={`nav-button ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Home() {
  return (
    <section>
      <h2>Painel Principal</h2>
      <p>
        Bem-vindo ao sistema SPA da Fábrica 632.  
        Aqui no futuro serão exibidas métricas, módulos e informações dinâmicas.
      </p>
    </section>
  );
}

function Sobre() {
  return (
    <section>
      <h2>Sobre o Sistema</h2>
      <p>
        Este projeto é uma Single Page Application (SPA) criada com React e Vite,
        servindo como base para o frontend da Fábrica 632.
      </p>
    </section>
  );
}

function Contato() {
  return (
    <section>
      <h2>Contato Interno</h2>
      <p>Aqui ficará a área de comunicação interna da fábrica.</p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <small>Fábrica 632 • React SPA • Desenvolvido para fins educacionais</small>
    </footer>
  );
}

export default App;
