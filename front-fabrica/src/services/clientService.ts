// src/services/clientService.ts
import api from './api';
import { type Client } from '../types/client';

// READ
export const getClients = () => api.get<Client[]>('/clients');

// CREATE (Omit<...> significa "tudo de Client, menos o id")
export const createClient = (data: Omit<Client, 'id'>) => api.post<Client>('/clients', data);

// UPDATE
export const updateClient = (id: number, data: Client) => api.put<Client>(`/clients/${id}`, data);

// DELETE
export const deleteClient = (id: number) => api.delete(`/clients/${id}`);