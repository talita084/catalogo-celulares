import type { Celular } from '../types';

const API_URL = 'http://localhost:3000/celulares';

export const api = {
  // GET - Listar todos os celulares
  getCelulares: async (): Promise<Celular[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro ao buscar celulares');
    return response.json();
  },

  // GET - Buscar celular por ID
  getCelularById: async (id: number): Promise<Celular> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar celular');
    return response.json();
  },

  // POST - Criar novo celular
  createCelular: async (celular: Omit<Celular, 'id'>): Promise<Celular> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(celular),
    });
    if (!response.ok) throw new Error('Erro ao criar celular');
    return response.json();
  },

  // PUT - Atualizar celular
  updateCelular: async (id: number, celular: Celular): Promise<Celular> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(celular),
    });
    if (!response.ok) throw new Error('Erro ao atualizar celular');
    return response.json();
  },

  // DELETE - Remover celular
  deleteCelular: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar celular');
  },
};