import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      {/* Nav mínima só pra testar (pode remover depois) */}
      <nav style={{ padding: 12, display: "flex", gap: 12 }}>
        <Link to="/fornecedores">Fornecedores</Link>
        <Link to="/fornecedores/novo">Novo</Link>
      </nav>
      <Outlet />
    </div>
  );
}
