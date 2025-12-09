import { useEffect, useState } from 'react';
import { Plus, Search, Filter, Heart } from 'lucide-react';
import { api } from '../services/api';
import type { Celular } from '../types';
import { Card } from '../components/Card';
import { Form } from '../components/Form';

export const List = () => {
  const [celulares, setCelulares] = useState<Celular[]>([]);
  const [filteredCelulares, setFilteredCelulares] = useState<Celular[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCelular, setEditingCelular] = useState<Celular | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMarca, setFilterMarca] = useState('');
  const [filterFavorito, setFilterFavorito] = useState<'all' | 'favoritos' | 'outros'>('all');
  const [sortBy, setSortBy] = useState<'modelo' | 'preco' | 'ano'>('modelo');

  useEffect(() => {
    loadCelulares();
  }, []);

  useEffect(() => {
    filterCelulares();
  }, [celulares, searchTerm, filterMarca, filterFavorito, sortBy]);

  const loadCelulares = async () => {
    try {
      setLoading(true);
      const data = await api.getCelulares();
      setCelulares(data);
    } catch (error) {
      console.error('Erro ao carregar celulares:', error);
      alert('Erro ao carregar celulares. Verifique se o JSON Server está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const filterCelulares = () => {
    let filtered = [...celulares];

    // Filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (celular) =>
          celular.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          celular.marca.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro de marca
    if (filterMarca) {
      filtered = filtered.filter((celular) => celular.marca === filterMarca);
    }

    // Filtro de favorito
    if (filterFavorito === 'favoritos') {
      filtered = filtered.filter((celular) => celular.favorito);
    } else if (filterFavorito === 'outros') {
      filtered = filtered.filter((celular) => !celular.favorito);
    }

    // Ordenação
    filtered.sort((a, b) => {
      if (sortBy === 'modelo') {
        return a.modelo.localeCompare(b.modelo);
      } else if (sortBy === 'preco') {
        return b.preco - a.preco;
      } else if (sortBy === 'ano') {
        return b.ano - a.ano;
      }
      return 0;
    });

    setFilteredCelulares(filtered);
  };

  const handleSubmit = async (celular: Celular) => {
    try {
      if (editingCelular?.id) {
        await api.updateCelular(editingCelular.id, celular);
      } else {
        await api.createCelular(celular);
      }
      await loadCelulares();
      setShowForm(false);
      setEditingCelular(undefined);
    } catch (error) {
      console.error('Erro ao salvar celular:', error);
      alert('Erro ao salvar celular');
    }
  };

  const handleEdit = (celular: Celular) => {
    setEditingCelular(celular);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este celular?')) return;

    try {
      await api.deleteCelular(id);
      await loadCelulares();
    } catch (error) {
      console.error('Erro ao deletar celular:', error);
      alert('Erro ao deletar celular');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCelular(undefined);
  };

  const marcas = Array.from(new Set(celulares.map((c) => c.marca)));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando catálogo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Catálogo de Celulares
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredCelulares.length} {filteredCelulares.length === 1 ? 'celular' : 'celulares'} encontrado
            {filteredCelulares.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Adicionar Celular
        </button>
      </div>

      {/* Filtros */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por modelo ou marca..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Filtro de Marca */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterMarca}
              onChange={(e) => setFilterMarca(e.target.value)}
              className="input-field pl-10"
            >
              <option value="">Todas as marcas</option>
              {marcas.map((marca) => (
                <option key={marca} value={marca}>
                  {marca}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro de Favoritos */}
          <div className="relative">
            <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterFavorito}
              onChange={(e) => setFilterFavorito(e.target.value as any)}
              className="input-field pl-10"
            >
              <option value="all">Todos</option>
              <option value="favoritos">Favoritos</option>
              <option value="outros">Outros</option>
            </select>
          </div>

          {/* Ordenação */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="input-field"
          >
            <option value="modelo">Ordenar por Modelo</option>
            <option value="preco">Ordenar por Preço</option>
            <option value="ano">Ordenar por Ano</option>
          </select>
        </div>

        <button
          onClick={() => {
            setSearchTerm('');
            setFilterMarca('');
            setFilterFavorito('all');
          }}
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          Limpar Filtros
        </button>
      </div>

      {/* Grid de Celulares */}
      {filteredCelulares.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-gray-100 dark:bg-gray-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
            Nenhum celular encontrado
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterMarca('');
              setFilterFavorito('all');
            }}
            className="btn-secondary"
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCelulares.map((celular) => (
            <Card
              key={celular.id}
              celular={celular}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <Form
          celular={editingCelular}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};