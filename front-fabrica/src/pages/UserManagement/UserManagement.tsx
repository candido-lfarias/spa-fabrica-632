import { useState } from 'react';
import './UserManagement.css';
import '../../App.css';
import logoImage from '../../assets/logo.png';

interface User {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  status: 'ativo' | 'inativo';
}

export default function UserManagement() {
  const [users] = useState<User[]>([
    { id: 1, nome: 'Nome usuário', email: 'emaildousuario@gmail.com', cargo: 'Funcionário', status: 'ativo' },
    { id: 2, nome: 'Nome usuário', email: 'emaildousuario@gmail.com', cargo: 'Funcionário', status: 'inativo' },
    { id: 3, nome: 'Nome usuário', email: 'emaildousuario@gmail.com', cargo: 'Funcionário', status: 'ativo' },
    { id: 4, nome: 'Nome usuário', email: 'emaildousuario@gmail.com', cargo: 'Funcionário', status: 'inativo' },
    { id: 5, nome: 'Nome usuário', email: 'emaildousuario@gmail.com', cargo: 'Funcionário', status: 'ativo' },
    { id: 6, nome: 'Nome usuário', email: 'emaildousuario@gmail.com', cargo: 'Funcionário', status: 'inativo' },
    { id: 7, nome: 'Nome usuário', email: 'emaildousuario@gmail.com', cargo: 'Funcionário', status: 'ativo' },
    { id: 8, nome: 'Nome usuário', email: 'emaildousuario@gmail.com', cargo: 'Funcionário', status: 'inativo' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const handleEdit = (id: number) => {
    console.log('Edit user:', id);
    // Implement edit functionality
  };

  const handleDelete = (id: number) => {
    console.log('Delete user:', id);
    // Implement delete functionality
  };

  const handleStatusToggle = (id: number) => {
    console.log('Toggle status for user:', id);
    // Implement status toggle functionality
  };

  return (
    <div className="user-management-container">
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
        <header className="user-management-header">
          <h1>Gerenciamento de Usuários</h1>
          <button className="logout-btn">Logout</button>
        </header>

        <div className="user-management-content">
          <div className="action-bar">
            <button className="btn-create-user">CRIAR NOVO USUÁRIO</button>
            <div className="search-container">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#492F2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 19L14.65 14.65" stroke="#492F2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder=""
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="role-dropdown"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">Cargo do usuário</option>
              <option value="funcionario">Funcionário</option>
              <option value="admin">Administrador</option>
              <option value="gerente">Gerente</option>
            </select>
          </div>

          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Cargo</th>
                  <th>Ações</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.nome}</td>
                    <td>{user.email}</td>
                    <td>{user.cargo}</td>
                    <td className="actions-cell">
                      <button
                        className="icon-btn"
                        onClick={() => handleEdit(user.id)}
                        aria-label="Editar"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0667 3.65002 11.4167L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.93335 15.0834 8.46669 14.8084 8.73335 14.525L15.575 7.28335C16.6 6.25835 17.075 5.11669 15.4584 3.50002C13.85 1.89169 12.7084 2.35835 11.05 3.00002Z" stroke="#492F2E" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9.90833 4.20831C10.2667 5.99165 11.8083 7.44998 13.6083 7.73331" stroke="#492F2E" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button
                        className="icon-btn"
                        onClick={() => handleDelete(user.id)}
                        aria-label="Deletar"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332" stroke="#492F2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169" stroke="#492F2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664" stroke="#492F2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8.60831 13.75H11.3833" stroke="#492F2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7.91669 10.4167H12.0834" stroke="#492F2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </td>
                    <td className="status-cell">
                      <button
                        className={`status-btn ${user.status}`}
                        onClick={() => handleStatusToggle(user.id)}
                      >
                        {user.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

