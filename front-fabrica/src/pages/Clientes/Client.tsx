import React, { useEffect, useMemo, useState } from "react";
import logo from "../../assets/logo.png";
import "../Home/Home.css";
import "./ClientList.css";
import "./ClienteForm.css";
import "./ClientDeleteModal.css";

type TipoCliente = "PF" | "PJ";
type StatusCliente = "Ativo" | "Inativo";

interface Cliente {
  id: number;
  tipo: TipoCliente;
  status: StatusCliente;
  nome: string;
  cnpj?: string;
  cpf?: string;
  email: string;
  telefone?: string;
  endereco?: string;
  cep?: string;
  credito?: string;
}

const initialClientes: Cliente[] = [
  {
    id: 1,
    tipo: "PJ",
    status: "Ativo",
    nome: "EMPRESA RIO LTDA.",
    cnpj: "00.000.000/0000-00",
    email: "empresarioclientes@gmail.com",
    telefone: "43 99876-0000",
    endereco: "Rua Júlio, 123, Bairro Tiradentes",
    cep: "87650-000",
    credito: "2.000.000,00",
  },
  {
    id: 2,
    tipo: "PJ",
    status: "Inativo",
    nome: "EMPRESA SP LTDA.",
    cnpj: "04.003.000/0020-00",
    email: "empresaspoffc@gmail.com",
    credito: "500.000,00",
  },
];

const ModalConfirmacao: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cliente: Cliente | null;
}> = ({ isOpen, onClose, onConfirm, cliente }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Confirmar Exclusão</h2>
        <p>
          Tem certeza que deseja excluir <strong>{cliente?.nome}</strong>?<br />
          Todos os seus dados serão excluídos.
        </p>
        <div className="row">
          <button className="btn primary" onClick={onConfirm}>Excluir</button>
          <button className="btn ghost" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

const FormCliente: React.FC<{
  cliente: Cliente | null;
  modo: "cadastrar" | "editar";
  onSave: (c: Cliente) => void;
  onCancel: (idParaExcluir?: number) => void;
}> = ({ cliente, modo, onSave, onCancel }) => {
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
    if (erros[key as string]) setErros((e) => ({ ...e, [key as string]: "" }));
  }

  function validar() {
    const e: Record<string, string> = {};
    if (!form.nome.trim()) e.nome = "Nome é obrigatório.";
    if (!form.email.trim()) e.email = "E-mail é obrigatório.";
    if (form.tipo === "PJ" && !form.cnpj?.trim()) e.cnpj = "CNPJ é obrigatório.";
    if (form.tipo === "PF" && !form.cpf?.trim()) e.cpf = "CPF é obrigatório.";
    setErros(e);
    return Object.keys(e).length === 0;
  }

  function salvar() {
    if (!validar()) return;
    const payload: Cliente = {
      ...form,
      cnpj: form.tipo === "PJ" ? form.cnpj : undefined,
      cpf: form.tipo === "PF" ? form.cpf : undefined,
    };
    onSave(payload);
  }

  return (
    <div className="client-form-wrap">
      <div className="insumos-header">
        <button className="btn-page" onClick={() => onCancel()}>←</button>
        <h1>{modo === "editar" ? "Editar Cliente" : "Criar Novo Cliente"}</h1>
      </div>

      <form className="grid" onSubmit={(e) => e.preventDefault()}>
        <section className="card">
          <h3>Dados Pessoais</h3>
          <div className="row">
            <label className="radio">
              <input
                type="radio"
                checked={form.tipo === "PF"}
                onChange={() => set("tipo", "PF")}
              />
              Pessoa Física
            </label>
            <label className="radio">
              <input
                type="radio"
                checked={form.tipo === "PJ"}
                onChange={() => set("tipo", "PJ")}
              />
              Pessoa Jurídica
            </label>

            <div className="status">
              <span>Status</span>
              <div className="status-pills">
                <button
                  type="button"
                  className={`pill ${form.status === "Ativo" ? "on" : ""}`}
                  onClick={() => set("status", "Ativo")}
                >
                  Ativo
                </button>
                <button
                  type="button"
                  className={`pill ${form.status === "Inativo" ? "off" : ""}`}
                  onClick={() => set("status", "Inativo")}
                >
                  Inativo
                </button>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label>Nome Completo / Razão Social *</label>
              <input
                value={form.nome}
                onChange={(e) => set("nome", e.target.value)}
              />
              {erros.nome && <small className="error">{erros.nome}</small>}
            </div>
          </div>

          <div className="row two">
            {form.tipo === "PJ" ? (
              <div className="field">
                <label>CNPJ *</label>
                <input value={form.cnpj || ""} onChange={(e) => set("cnpj", e.target.value)} />
                {erros.cnpj && <small className="error">{erros.cnpj}</small>}
              </div>
            ) : (
              <div className="field">
                <label>CPF *</label>
                <input value={form.cpf || ""} onChange={(e) => set("cpf", e.target.value)} />
                {erros.cpf && <small className="error">{erros.cpf}</small>}
              </div>
            )}
          </div>
        </section>

        <section className="card">
          <h3>Contatos</h3>
          <div className="row">
            <div className="field">
              <label>Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
              {erros.email && <small className="error">{erros.email}</small>}
            </div>
          </div>
          <div className="row two">
            <div className="field">
              <label>Telefone</label>
              <input value={form.telefone || ""} onChange={(e) => set("telefone", e.target.value)} />
            </div>
            <div className="field">
              <label>CEP</label>
              <input value={form.cep || ""} onChange={(e) => set("cep", e.target.value)} />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label>Endereço</label>
              <input value={form.endereco || ""} onChange={(e) => set("endereco", e.target.value)} />
            </div>
          </div>
        </section>

        <section className="card">
          <h3>Informações Financeiras</h3>
          <div className="row two">
            <div className="field">
              <label>Método de Pagamento</label>
              <select defaultValue="">
                <option value="">Selecione</option>
                <option value="boleto">Boleto</option>
                <option value="pix">PIX</option>
                <option value="cartao">Cartão</option>
                <option value="transferencia">Transferência</option>
              </select>
            </div>
            <div className="field">
              <label>Crédito (R$)</label>
              <input value={form.credito || ""} onChange={(e) => set("credito", e.target.value)} />
            </div>
          </div>
        </section>

        <div className="actions">
          {modo === "editar" && (
            <button type="button" className="btn danger" onClick={() => onCancel(form.id)}>
              Excluir Cliente
            </button>
          )}
          <button type="button" className="btn primary" onClick={salvar}>
            {modo === "editar" ? "Salvar Alterações" : "Criar Cliente"}
          </button>
          <button type="button" className="btn ghost" onClick={() => onCancel()}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

const ListaClientes: React.FC<{
  clientes: Cliente[];
  onAdd: () => void;
  onEdit: (c: Cliente) => void;
  onDelete: (c: Cliente) => void;
}> = ({ clientes, onAdd, onEdit, onDelete }) => {
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState<TipoCliente | "">("");
  const [status, setStatus] = useState<StatusCliente | "">("");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    setPage(1);
  }, [busca, tipo, status]);

  const filtrados = useMemo(() => {
    return clientes
      .filter((c) => c.nome.toLowerCase().includes(busca.toLowerCase()))
      .filter((c) => (tipo ? c.tipo === tipo : true))
      .filter((c) => (status ? c.status === status : true));
  }, [clientes, busca, tipo, status]);

  const total = Math.max(1, Math.ceil(filtrados.length / pageSize));
  const slice = filtrados.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="clients-wrap">
      <div className="insumos-header">
        <h1>Gerenciamento de Clientes</h1>
        <button className="btn primary" onClick={onAdd}>+ Novo Cliente</button>
      </div>

      <div className="filters">
        <input
          placeholder="Buscar por nome"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <select
          value={tipo}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setTipo(e.target.value as TipoCliente | "")
          }
        >
          <option value="">Tipo de Cliente</option>
          <option value="PF">Pessoa Física</option>
          <option value="PJ">Pessoa Jurídica</option>
        </select>

        <select
          value={status}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setStatus(e.target.value as StatusCliente | "")
          }
        >
          <option value="">Status</option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>
      </div>

      <table className="clients-table">
        <thead>
          <tr>
            <th>CNPJ/CPF</th>
            <th>Nome</th>
            <th>Status</th>
            <th>Email</th>
            <th>Créditos Limite</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {slice.map((c) => (
            <tr key={c.id}>
              <td>{c.tipo === "PJ" ? c.cnpj : c.cpf}</td>
              <td>{c.nome}</td>
              <td>
                <span className={c.status === "Ativo" ? "badge active" : "badge inactive"}>
                  {c.status}
                </span>
              </td>
              <td>{c.email}</td>
              <td>{c.credito || "-"}</td>
              <td className="actions">
                <button title="Editar" onClick={() => onEdit(c)}>✏️</button>
                <button title="Excluir" onClick={() => onDelete(c)}>🗑️</button>
              </td>
            </tr>
          ))}

          {slice.length === 0 && (
            <tr>
              <td colSpan={6} className="empty">Nenhum cliente encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>« Anterior</button>
        <span>Página {page} de {total}</span>
        <button disabled={page >= total} onClick={() => setPage((p) => p + 1)}>Próxima »</button>
      </div>
    </div>
  );
};

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo Café" className="logo" />
      </div>
      <ul className="sidebar-menu">
        <li><a href="/home">Home</a></li>
        <li><a href="/compras">Compras</a></li>
        <li><a href="/vendas">Vendas</a></li>
        <li><a href="/clients">Clientes</a></li>
        <li><a href="/fornecedores">Fornecedores</a></li>
        <li><a href="/produtos">Produtos</a></li>
      </ul>
    </div>
  );
}

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>(initialClientes);
  const [view, setView] = useState<"list" | "new" | "edit">("list");
  const [selected, setSelected] = useState<Cliente | null>(null);
  const [modal, setModal] = useState<{ isOpen: boolean; cliente: Cliente | null }>({
    isOpen: false,
    cliente: null,
  });
  const [toast, setToast] = useState<{ texto: string; tipo: "sucesso" | "erro" } | null>(null);

  function notify(texto: string, tipo: "sucesso" | "erro" = "sucesso") {
    setToast({ texto, tipo });
    setTimeout(() => setToast(null), 3000);
  }

  function salvar(c: Cliente) {
    if (c.id) {
      setClientes((prev) => prev.map((x) => (x.id === c.id ? c : x)));
      notify("Cliente atualizado com sucesso!");
    } else {
      const novo = { ...c, id: Date.now() };
      setClientes((prev) => [novo, ...prev]);
      notify("Cliente criado com sucesso!");
    }
    setView("list");
    setSelected(null);
  }

  function editar(c: Cliente) {
    setSelected(c);
    setView("edit");
  }

  function pedirExclusao(c: Cliente) {
    setModal({ isOpen: true, cliente: c });
  }

  function confirmarExclusao() {
    if (!modal.cliente) return;
    setClientes((prev) => prev.filter((x) => x.id !== modal.cliente!.id));
    setModal({ isOpen: false, cliente: null });
    notify("Cliente excluído com sucesso!");
    if (view !== "list") setView("list");
  }

  function cancelar(idParaExcluir?: number) {
    if (idParaExcluir) {
      const c = clientes.find((x) => x.id === idParaExcluir);
      if (c) pedirExclusao(c);
    } else {
      setView("list");
      setSelected(null);
    }
  }

  return (
    <div className="home-container">
      <Sidebar />

      <div className="main-content">
        {toast && <div className={`notification ${toast.tipo}`}>{toast.texto}</div>}

        {view === "list" && (
          <ListaClientes
            clientes={clientes}
            onAdd={() => setView("new")}
            onEdit={editar}
            onDelete={pedirExclusao}
          />
        )}

        {(view === "new" || view === "edit") && (
          <FormCliente
            cliente={selected}
            modo={view === "edit" ? "editar" : "cadastrar"}
            onSave={salvar}
            onCancel={cancelar}
          />
        )}

        <ModalConfirmacao
          isOpen={modal.isOpen}
          onClose={() => setModal({ isOpen: false, cliente: null })}
          onConfirm={confirmarExclusao}
          cliente={modal.cliente}
        />
      </div>
    </div>
  );
}
