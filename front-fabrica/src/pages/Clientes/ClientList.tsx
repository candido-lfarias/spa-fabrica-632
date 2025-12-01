import React, { useState } from "react";
import "./ClientList.css";

interface Cliente {
  id: number;
  tipo: "PF" | "PJ";
  status: "Ativo" | "Inativo";
  nome: string;
  cnpj?: string;
  cpf?: string;
  email: string;
  credito?: string;
}

interface Props {
  clientes: Cliente[];
  onAdd: () => void;
  onEdit: (c: Cliente) => void;
  onDelete: (c: Cliente) => void;
}

export default function ClientList({ clientes, onAdd, onEdit, onDelete }: Props) {
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState("");
  const [status, setStatus] = useState("");

  const filtrados = clientes
    .filter((c) => c.nome.toLowerCase().includes(busca.toLowerCase()))
    .filter((c) => (tipo ? c.tipo === tipo : true))
    .filter((c) => (status ? c.status === status : true));

  return (
    <div className="client-list-container">
      <div className="header">
        <h1>Gerenciamento de Clientes</h1>
        <button className="btn-new" onClick={onAdd}>
          + Novo Cliente
        </button>
      </div>

      <div className="filters">
        <input
          placeholder="Buscar cliente"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="">Tipo de cliente</option>
          <option value="PF">Pessoa Física</option>
          <option value="PJ">Pessoa Jurídica</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Status</option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>
      </div>

      <table className="client-table">
        <thead>
          <tr>
            <th>CNPJ/CPF</th>
            <th>Nome</th>
            <th>Status</th>
            <th>Email</th>
            <th>Créditos</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {filtrados.map((c) => (
            <tr key={c.id}>
              <td>{c.tipo === "PJ" ? c.cnpj : c.cpf}</td>
              <td>{c.nome}</td>
              <td>
                <span className={`badge ${c.status.toLowerCase()}`}>
                  {c.status}
                </span>
              </td>
              <td>{c.email}</td>
              <td>{c.credito || "-"}</td>
              <td className="actions">
                <button onClick={() => onEdit(c)}>✏️</button>
                <button onClick={() => onDelete(c)}>🗑️</button>
              </td>
            </tr>
          ))}

          {filtrados.length === 0 && (
            <tr>
              <td colSpan={6} className="empty">
                Nenhum cliente encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}