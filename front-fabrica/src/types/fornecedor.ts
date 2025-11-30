export type StatusFornecedor = "Ativo" | "Inativo";
export interface Contatos { telefone?: string; email?: string; }
export interface Endereco { cep?: string; logradouro?: string; numero?: string; bairro?: string; cidade?: string; uf?: string; }
export interface Fornecedor {
  id?: number;
  razaoSocial: string;
  cnpj: string;
  nomeFantasia?: string;
  inscricaoEstadual?: string;
  categoria?: string;
  contatos?: Contatos;
  endereco?: Endereco;
  status: StatusFornecedor;
}
