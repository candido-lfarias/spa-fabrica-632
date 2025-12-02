import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateUser.css';
import '../../App.css';
import logoImage from '../../assets/logo.png';

export default function CreateUser() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'fisica' | 'juridica'>('juridica');
  const [status, setStatus] = useState<'ativo' | 'inativo'>('ativo');
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    cnpj: '',
    emailPrincipal: '',
    telefonePrincipal: '',
    endereco: '',
    cep: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating user:', { userType, status, ...formData });
    // Implement create user functionality
    // After successful creation, navigate back
    navigate('/producao');
  };

  const handleCancel = () => {
    navigate('/producao');
  };

  return (
    <div className="create-user-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <img src={logoImage} alt="Logo Café" className="logo" />
        </div>
        <ul className="sidebar-menu">
          <li><a href="/home">Home</a></li>
          <li><a href="/compras">Compras</a></li>
          <li><a href="/vendas">Vendas</a></li>
          <li><a href="/clientes">Clientes</a></li>
          <li><a href="/fornecedores">Fornecedores</a></li>
          <li className="active"><a href="/producao">Produção</a></li>
        </ul>
      </div>

      <div className="main-content">
        <header className="create-user-header">
          <h1>Gerenciamento de Usuários</h1>
          <button className="logout-btn">Logout</button>
        </header>

        <div className="create-user-content">
          <h2 className="form-title">Criar usuário</h2>

          <form onSubmit={handleSubmit} className="create-user-form">
            {/* Dados Pessoais Section */}
            <div className="form-section">
              <div className="section-header">
                <h3>Dados Pessoais</h3>
                <div className="status-selection">
                  <label>Status</label>
                  <div className="status-buttons">
                    <button
                      type="button"
                      className={`status-radio ${status === 'ativo' ? 'active' : ''} ativo`}
                      onClick={() => setStatus('ativo')}
                    >
                      Ativo
                    </button>
                    <button
                      type="button"
                      className={`status-radio ${status === 'inativo' ? 'active' : ''} inativo`}
                      onClick={() => setStatus('inativo')}
                    >
                      Inativo
                    </button>
                  </div>
                </div>
              </div>

              <div className="user-type-selection">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="userType"
                    value="fisica"
                    checked={userType === 'fisica'}
                    onChange={() => setUserType('fisica')}
                  />
                  <span>Pessoa Física</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="userType"
                    value="juridica"
                    checked={userType === 'juridica'}
                    onChange={() => setUserType('juridica')}
                  />
                  <span>Pessoa Jurídica</span>
                </label>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nomeCompleto">Nome Completo</label>
                  <input
                    type="text"
                    id="nomeCompleto"
                    name="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {userType === 'juridica' && (
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cnpj">CNPJ</label>
                    <input
                      type="text"
                      id="cnpj"
                      name="cnpj"
                      value={formData.cnpj}
                      onChange={handleInputChange}
                      placeholder="00.000.000/0000-00"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Contatos Section */}
            <div className="form-section">
              <h3>Contatos</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="emailPrincipal">Email Principal</label>
                  <input
                    type="email"
                    id="emailPrincipal"
                    name="emailPrincipal"
                    value={formData.emailPrincipal}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="telefonePrincipal">Telefone Principal</label>
                  <input
                    type="tel"
                    id="telefonePrincipal"
                    name="telefonePrincipal"
                    value={formData.telefonePrincipal}
                    onChange={handleInputChange}
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              <div className="form-row address-row">
                <div className="form-group address-group">
                  <label htmlFor="endereco">Endereço</label>
                  <input
                    type="text"
                    id="endereco"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group cep-group">
                  <label htmlFor="cep">CEP</label>
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    value={formData.cep}
                    onChange={handleInputChange}
                    placeholder="00000-000"
                  />
                </div>
                <button type="button" className="btn-add-contact">
                  Adicionar Contato +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <button type="submit" className="btn-create-client">
                Criar Cliente
              </button>
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

