import React, { useState } from 'react';
import './Insumos.css';

// Tipos
interface Insumo {
  id: number;
  nome: string;
  categoria: string;
  quantidade: number;
  unidade: string;
  fornecedor: string;
}

// Dados iniciais
const initialInsumos: Insumo[] = [
  { id: 1, nome: 'Café em grão', categoria: 'Matéria-prima', quantidade: 120, unidade: 'kg', fornecedor: 'Café Ltda.' },
  { id: 2, nome: 'Açucar', categoria: 'Ingredientes', quantidade: 50, unidade: 'kg', fornecedor: 'Fornecedor A' },
  { id: 3, nome: 'Embalagem', categoria: 'Embalagens', quantidade: 200, unidade: 'unt', fornecedor: 'Embalagens xyz' },
];

const categorias = ['Matéria-prima', 'Ingredientes', 'Embalagens', 'Utensílios'];

// Modal de Confirmação
const ModalConfirmacao: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  insumo: Insumo | null;
}> = ({ isOpen, onClose, onConfirm, insumo }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirmar Exclusão</h3>
        <p>
          Tem certeza que deseja excluir o insumo <strong>{insumo?.nome}</strong>? 
          Esta ação não pode ser desfeita.
        </p>
        <div className="modal-actions">
          <button onClick={onClose} className="btn-cancel">
            Cancelar
          </button>
          <button onClick={onConfirm} className="btn-delete">
            Excluir Insumo
          </button>
        </div>
      </div>
    </div>
  );
};


// Componente de Formulário
const FormularioInsumo: React.FC<{
  insumo: Insumo | null;
  onSave: (dados: Insumo) => void;
  onCancel: (id?: number) => void;
  modo: 'cadastrar' | 'editar';
}> = ({ insumo, onSave, onCancel, modo }) => {
  const [formData, setFormData] = useState<Insumo>(insumo || {
    id: 0,
    nome: '',
    categoria: 'Ingredientes',
    unidade: 'kg',
    quantidade: 0,
    fornecedor: ''
  });
  const [erros, setErros] = useState<Record<string, string>>({});

  const validarCampos = () => {
    const novosErros: Record<string, string> = {};
    
    if (!formData.nome.trim()) {
      novosErros.nome = 'O nome é obrigatório';
    }
    
    if (!formData.quantidade || formData.quantidade <= 0) {
      novosErros.quantidade = 'A quantidade deve ser maior que 0';
    }
    
    if (!formData.fornecedor.trim()) {
      novosErros.fornecedor = 'O fornecedor é obrigatório';
    }
    
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = () => {
    if (validarCampos()) {
      onSave(formData);
    }
  };

  const handleChange = (field: keyof Insumo, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (erros[field]) {
      setErros(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="insumos-page">
      <div className="insumos-header">
        <button onClick={() => onCancel()} className="btn-back">
          ←
        </button>
        <h1>{modo === 'editar' ? 'EDITAR INSUMO' : 'CADASTRAR INSUMO'}</h1>
      </div>

      <div className="form-container">
        <div className="form-grid">
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              className={erros.nome ? 'error' : ''}
              placeholder="Ex: Café em grão"
            />
            {erros.nome && <span className="error-message">{erros.nome}</span>}
          </div>

          <div className="form-group">
            <label>Quantidade em estoque</label>
            <input
              type="number"
              value={formData.quantidade}
              onChange={(e) => handleChange('quantidade', parseFloat(e.target.value))}
              className={erros.quantidade ? 'error' : ''}
              placeholder="Ex: 120"
            />
            {erros.quantidade && <span className="error-message">{erros.quantidade}</span>}
          </div>

          <div className="form-group">
            <label>Categoria</label>
            <select
              value={formData.categoria}
              onChange={(e) => handleChange('categoria', e.target.value)}
            >
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Fornecedor</label>
            <input
              type="text"
              value={formData.fornecedor}
              onChange={(e) => handleChange('fornecedor', e.target.value)}
              className={erros.fornecedor ? 'error' : ''}
              placeholder="Ex: Café Ltda."
            />
            {erros.fornecedor && <span className="error-message">{erros.fornecedor}</span>}
          </div>

          <div className="form-group">
            <label>Unidade</label>
            <input
              type="text"
              value={formData.unidade}
              onChange={(e) => handleChange('unidade', e.target.value)}
              placeholder="Ex: Kg"
            />
          </div>
        </div>

        <div className="form-actions">
          {modo === 'editar' && (
            <button
              onClick={() => onCancel(formData.id)}
              className="btn-delete"
            >
              EXCLUIR INSUMO
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="btn-submit"
          >
            {modo === 'editar' ? 'EDITAR INSUMO' : '+ CADASTRAR INSUMO'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente de Listagem
const ListagemInsumos: React.FC<{
  insumos: Insumo[];
  onEdit: (insumo: Insumo) => void;
  onDelete: (insumo: Insumo) => void;
  onAdd: () => void;
}> = ({ insumos, onEdit, onDelete, onAdd }) => {
  const [busca, setBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [fornecedorFiltro, setFornecedorFiltro] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  const fornecedoresUnicos = [...new Set(insumos.map(i => i.fornecedor))];

  const insumosFiltrados = insumos.filter(insumo => {
    const matchBusca = insumo.nome.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = !categoriaFiltro || insumo.categoria === categoriaFiltro;
    const matchFornecedor = !fornecedorFiltro || insumo.fornecedor === fornecedorFiltro;
    return matchBusca && matchCategoria && matchFornecedor;
  });

  const totalPaginas = Math.ceil(insumosFiltrados.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const insumosPaginados = insumosFiltrados.slice(inicio, inicio + itensPorPagina);

  return (
    <div className="insumos-page">
      <div className="insumos-header">
        <h1>INSUMOS</h1>
        <button onClick={onAdd} className="btn-add">
          + CADASTRAR INSUMO
        </button>
      </div>

      <div className="filters-container">
        <div className="filter-group">
          <label>Categoria</label>
          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
          >
            <option value="">Todas</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Fornecedor</label>
          <select
            value={fornecedorFiltro}
            onChange={(e) => setFornecedorFiltro(e.target.value)}
          >
            <option value="">Todos</option>
            {fornecedoresUnicos.map(forn => (
              <option key={forn} value={forn}>{forn}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Buscar insumo pelo nome</label>
          <div className="search-box">
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar insumo"
            />
            <button className="btn-search">🔍</button>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="insumos-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Quantidade em estoque</th>
              <th>Unidade</th>
              <th>Fornecedor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {insumosPaginados.map((insumo) => (
              <tr key={insumo.id}>
                <td>{insumo.nome}</td>
                <td>{insumo.categoria}</td>
                <td>{insumo.quantidade}</td>
                <td>{insumo.unidade}</td>
                <td>{insumo.fornecedor}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => onEdit(insumo)}
                      className="btn-edit"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(insumo)}
                      className="btn-delete-icon"
                      title="Excluir"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPaginas > 1 && (
          <div className="pagination">
            <button
              onClick={() => setPaginaAtual(p => Math.max(1, p - 1))}
              disabled={paginaAtual === 1}
              className="btn-page"
            >
              ←
            </button>
            <span>Página {paginaAtual} de {totalPaginas}</span>
            <button
              onClick={() => setPaginaAtual(p => Math.min(totalPaginas, p + 1))}
              disabled={paginaAtual === totalPaginas}
              className="btn-page"
            >
              →
            </button>
          </div>
        )}
      </div>

      {insumosFiltrados.length === 0 && (
        <div className="empty-state">
          Nenhum insumo encontrado com os filtros selecionados.
        </div>
      )}
    </div>
  );
};

// Componente Principal
export default function Insumos() {
  const [insumos, setInsumos] = useState<Insumo[]>(initialInsumos);
  const [tela, setTela] = useState<'listagem' | 'cadastrar' | 'editar'>('listagem');
  const [insumoSelecionado, setInsumoSelecionado] = useState<Insumo | null>(null);
  const [modalExclusao, setModalExclusao] = useState<{ isOpen: boolean; insumo: Insumo | null }>({ 
    isOpen: false, 
    insumo: null 
  });
  const [mensagem, setMensagem] = useState<{ texto: string; tipo: 'sucesso' | 'erro' } | null>(null);

  const mostrarMensagem = (texto: string, tipo: 'sucesso' | 'erro' = 'sucesso') => {
    setMensagem({ texto, tipo });
    setTimeout(() => setMensagem(null), 3000);
  };

  const handleSalvar = (dadosInsumo: Insumo) => {
    if (dadosInsumo.id) {
      setInsumos(prev => prev.map(i => i.id === dadosInsumo.id ? dadosInsumo : i));
      mostrarMensagem('Insumo atualizado com sucesso!');
    } else {
      const novoInsumo = { ...dadosInsumo, id: Date.now() };
      setInsumos(prev => [...prev, novoInsumo]);
      mostrarMensagem('Insumo cadastrado com sucesso!');
    }
    setTela('listagem');
    setInsumoSelecionado(null);
  };

  const handleEditar = (insumo: Insumo) => {
    setInsumoSelecionado(insumo);
    setTela('editar');
  };

  const handleExcluir = (insumo: Insumo) => {
    setModalExclusao({ isOpen: true, insumo });
  };

  const confirmarExclusao = () => {
    if (modalExclusao.insumo) {
      setInsumos(prev => prev.filter(i => i.id !== modalExclusao.insumo!.id));
      mostrarMensagem('Insumo excluído com sucesso!');
      setModalExclusao({ isOpen: false, insumo: null });
      if (tela !== 'listagem') {
        setTela('listagem');
      }
    }
  };

  const handleCancelar = (id?: number) => {
    if (id) {
      const insumo = insumos.find(i => i.id === id);
      if (insumo) handleExcluir(insumo);
    } else {
      setTela('listagem');
      setInsumoSelecionado(null);
    }
  };

  return (
    <div className="insumos-container">
      {mensagem && (
        <div className={`notification ${mensagem.tipo}`}>
          {mensagem.texto}
        </div>
      )}

      {tela === 'listagem' && (
        <ListagemInsumos
          insumos={insumos}
          onEdit={handleEditar}
          onDelete={handleExcluir}
          onAdd={() => setTela('cadastrar')}
        />
      )}

      {(tela === 'cadastrar' || tela === 'editar') && (
        <FormularioInsumo
          insumo={insumoSelecionado}
          onSave={handleSalvar}
          onCancel={handleCancelar}
          modo={tela}
        />
      )}

      <ModalConfirmacao
        isOpen={modalExclusao.isOpen}
        onClose={() => setModalExclusao({ isOpen: false, insumo: null })}
        onConfirm={confirmarExclusao}
        insumo={modalExclusao.insumo}
      />
    </div>
  );
}