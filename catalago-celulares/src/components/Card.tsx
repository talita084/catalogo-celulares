import type { Celular } from '../types';
import { Edit, Trash2, Star, Heart, Camera, Battery, HardDrive, Cpu } from 'lucide-react';

interface CardProps {
  celular: Celular;
  onEdit: (celular: Celular) => void;
  onDelete: (id: number) => void;
}

export const Card = ({ celular, onEdit, onDelete }: CardProps) => {
  return (
    <div className="card group">
      <div className="flex flex-col h-full">
        {/* Imagem */}
        <div className="relative overflow-hidden rounded-lg mb-4 h-64 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900 dark:to-primary-800">
          <img
            src={celular.imagem}
            alt={celular.modelo}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {celular.favorito && (
            <div className="absolute top-2 right-2">
              <Heart className="w-6 h-6 fill-red-500 text-red-500" />
            </div>
          )}
        </div>

        {/* Informações */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {celular.modelo}
              </h3>
              <p className="text-primary-600 dark:text-primary-400 font-semibold">
                {celular.marca}
              </p>
            </div>
            <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-xs font-bold">
              {celular.ano}
            </span>
          </div>

          {/* Avaliação */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < celular.avaliacao
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
              {celular.avaliacao}/5
            </span>
          </div>

          {/* Especificações */}
          <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <HardDrive className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span>{celular.armazenamento}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Cpu className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span>{celular.ram} RAM</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Camera className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span>{celular.camera}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Battery className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span>{celular.bateria}</span>
            </div>
          </div>

          {/* Tela */}
          <div className="mb-3">
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-semibold">
              Tela {celular.tela}
            </span>
          </div>

          {/* Descrição */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {celular.descricao}
          </p>

          {/* Preço */}
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-4">
            R$ {celular.preco.toLocaleString('pt-BR')}
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onEdit(celular)}
            className="flex-1 btn-secondary flex items-center justify-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Editar
          </button>
          <button
            onClick={() => celular.id && onDelete(celular.id)}
            className="btn-danger flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};