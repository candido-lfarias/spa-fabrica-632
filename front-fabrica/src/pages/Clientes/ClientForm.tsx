import React, { useState } from "react";
import "./ClientForm.css";

interface Cliente {
    id: number;
    tipo: "PF" | "PJ";
    status: "Ativo" | "Inativo";
    nome: string;
    cnpj?: string;
    cpf?: string;
    email: string;
    telefone?: string;
    endereco?: string;
    cep?: string;
    credito?: string;
}

interface Props {
    cliente: Cliente | null;
    modo: "cadastrar" | "editar";
    onSave: (c: Cliente) => void;
    onCancel: (deleteId?: number) => void;
}

export default function ClientForm({ cliente, modo, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Cliente>(
    cliente || {
      id: 0,
      tipo: "PJ",
      status: "Ativo",
      nome: "",
      cnpj: "",
      cpf: "",
      email: "",
      telefone: "",
      endereco: "",
      cep: "",
      credito: "",
    }
  );

  const [erros, setErros] = useState<Record<string, string>>({});

  function set<K extends keyof Cliente>(key: K, value: Cliente[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (erros[key as string]) setErros((e) => ({ ...e, [key]: "" }));
  }

  function validar() {
    const e: Record<string, string> = {};

    if (!form.nome.trim()) e.nome = "Nome é obrigatório.";
    if (!form.email.trim()) e.email = "Email é obrigatório.";

    if (form.tipo === "PJ" && !form.cnpj) e.cnpj = "CNPJ obrigatório.";
    if (form.tipo === "PF" && !form.cpf) e.cpf = "CPF obrigatório.";

    setErros(e);
    return Object.keys(e).length === 0;
  }

  function salvar() {
    if (!validar()) return;

    const payload = {
      ...form,
      cnpj: form.tipo === "PJ" ? form.cnpj : undefined,
      cpf: form.tipo === "PF" ? form.cpf : undefined,
    };

    onSave(payload);
  }

  return (
    <div className="client-form-container">
      <div className="header">
        <button className="back" onClick={() => onCancel()}>
          ←
        </button>
        <h1>{modo === "editar" ? "Editar Cliente" : "Criar Cliente"}</h1>
      </div>

      <div className="form">
        <div className="section">
          <h3>Dados Pessoais</h3>

          <div className="row">
            <label>
              <input
                type="radio"
                checked={form.tipo === "PF"}
                onChange={() => set("tipo", "PF")}
              />
              Pessoa Física
            </label>

            <label>
              <input
                type="radio"
                checked={form.tipo === "PJ"}
                onChange={() => set("tipo", "PJ")}
              />
              Pessoa Jurídica
            </label>
          </div>

          <div className="row">
            <div className="field">
              <label>Nome *</label>
              <input
                value={form.nome}
                onChange={(e) => set("nome", e.target.value)}
              />
              {erros.nome && <small className="error">{erros.nome}</small>}
            </div>
          </div>

          {form.tipo === "PJ" ? (
            <div className="field">
              <label>CNPJ *</label>
              <input
                value={form.cnpj}
                onChange={(e) => set("cnpj", e.target.value)}
              />
              {erros.cnpj && <small className="error">{erros.cnpj}</small>}
            </div>
          ) : (
            <div className="field">
              <label>CPF *</label>
              <input
                value={form.cpf}
                onChange={(e) => set("cpf", e.target.value)}
              />
              {erros.cpf && <small className="error">{erros.cpf}</small>}
            </div>
          )}
        </div>

        <div className="section">
          <h3>Contatos</h3>
          <div className="field">
            <label>Email *</label>
            <input
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
            {erros.email && <small className="error">{erros.email}</small>}
          </div>

          <div className="field">
            <label>Telefone</label>
            <input
              value={form.telefone}
              onChange={(e) => set("telefone", e.target.value)}
            />
          </div>

          <div className="row">
            <div className="field">
              <label>Endereço</label>
              <input
                value={form.endereco}
                onChange={(e) => set("endereco", e.target.value)}
              />
            </div>

            <div className="field">
              <label>CEP</label>
              <input
                value={form.cep}
                onChange={(e) => set("cep", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="section">
          <h3>Financeiro</h3>

          <div className="field">
            <label>Crédito (R$)</label>
            <input
              value={form.credito}
              onChange={(e) => set("credito", e.target.value)}
            />
          </div>
        </div>

        <div className="actions">
          {modo === "editar" && (
            <button
              className="btn-delete"
              onClick={() => onCancel(form.id)}
            >
              Excluir Cliente
            </button>
          )}

          <button className="btn-save" onClick={salvar}>
            {modo === "editar" ? "Salvar Alterações" : "Criar Cliente"}
          </button>
        </div>
      </div>
    </div>
  );
}
