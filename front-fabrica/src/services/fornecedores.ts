import { API_BASE, http } from "./http";
import type { Fornecedor } from "../types/fornecedor";

export interface ListQuery { page?: number; limit?: number; q?: string; categoria?: string; status?: string; }
export interface Paged<T> { data: T[]; }

export const fornecedoresService = {
  async list(params: ListQuery = {}): Promise<Paged<Fornecedor>> {
    const { page=1, limit=10, q, categoria, status } = params;
    const qs = new URLSearchParams({ _page:String(page), _limit:String(limit) });
    if (q) qs.set("q", q);
    if (categoria) qs.set("categoria", categoria);
    if (status) qs.set("status", status);
    const data = await http<Fornecedor[]>(`${API_BASE}/fornecedores?${qs.toString()}`);
    return { data };
  },
  async getById(id: number): Promise<Fornecedor> {
    return http<Fornecedor>(`${API_BASE}/fornecedores/${id}`);
  },
  async create(payload: Fornecedor): Promise<Fornecedor> {
    return http<Fornecedor>(`${API_BASE}/fornecedores`, { method:"POST", body: JSON.stringify(payload) });
  },
  async update(id: number, payload: Fornecedor): Promise<Fornecedor> {
    return http<Fornecedor>(`${API_BASE}/fornecedores/${id}`, { method:"PUT", body: JSON.stringify(payload) });
  },
  async remove(id: number): Promise<void> {
    await http<void>(`${API_BASE}/fornecedores/${id}`, { method:"DELETE" });
  },
};
