import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Plus, TrendingUp, Heart, DollarSign } from 'lucide-react';
import { api } from '../services/api';
import type { Celular } from '../types';

export const Home = () => {
  const [stats, setStats] = useState({
    total: 0,
    favoritos: 0,
    mediaPreco: 0,
    marcas: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const celulares = await api.getCelulares();
      const marcasUnicas = new Set(celulares.map((c: Celular) => c.marca)).size;
      const somaPrecos = celulares.reduce((acc: number, c: Celular) => acc + c.preco, 0);
      
      setStats({
        total: celulares.length,
        favoritos: celulares.filter((c: Celular) => c.favorito).length,
        mediaPreco: celulares.length > 0 ? somaPrecos / celulares.length : 0,
        marcas: marcasUnicas,
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const StatCard = ({ icon: Icon, title, value, color, prefix = '' }: any) => (
    <div className={`card ${color}`}>
      <div className="flex items-center gap-4">
        <div className={`p-4 rounded-full bg-gradient-to-br ${color}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {prefix}{value}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <Smartphone className="w-20 h-20 mx-auto mb-4 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Tech Store Premium
          </h1>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Gerencie seu catálogo de smartphones com estilo. Adicione, edite e organize seus dispositivos favoritos.
          </p>
          <Link 
            to="/celulares" 
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors shadow-lg"
          >
            <Smartphone className="w-5 h-5" />
            Ver Catálogo Completo
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={Smartphone}
            title="Total de Celulares"
            value={stats.total}
            color="from-purple-500 to-purple-600"
          />
          <StatCard
            icon={Heart}
            title="Favoritos"
            value={stats.favoritos}
            color="from-pink-500 to-pink-600"
          />
          <StatCard
            icon={DollarSign}
            title="Preço Médio"
            value={stats.mediaPreco.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            color="from-green-500 to-green-600"
            prefix="R$ "
          />
          <StatCard
            icon={TrendingUp}
            title="Marcas"
            value={stats.marcas}
            color="from-blue-500 to-blue-600"
          />
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="card text-center group hover:scale-105 transition-transform">
            <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
              <Plus className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Cadastro Rápido
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Adicione novos celulares com todas as especificações técnicas de forma simples.
            </p>
          </div>

          <div className="card text-center group hover:scale-105 transition-transform">
            <div className="bg-pink-100 dark:bg-pink-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-200 dark:group-hover:bg-pink-800 transition-colors">
              <Heart className="w-8 h-8 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Favoritos
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Marque seus celulares preferidos e encontre-os facilmente.
            </p>
          </div>

          <div className="card text-center group hover:scale-105 transition-transform">
            <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
              <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Comparação Fácil
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Compare especificações, preços e avaliações de forma visual.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="card bg-gradient-to-r from-primary-600 to-primary-800 text-white text-center p-12 mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para organizar seu catálogo?
          </h2>
          <p className="text-primary-100 mb-6 text-lg">
            Comece agora e mantenha todos os seus smartphones organizados em um só lugar.
          </p>
          <Link 
            to="/celulares" 
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Adicionar Primeiro Celular
          </Link>
        </div>
      </div>
    </div>
  );
};