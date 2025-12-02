// src/types/client.ts
export interface Client {
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