import { useState, useEffect } from 'react';
import type { FormCelularProps } from '../types';
import { X, Save, Star, Heart } from 'lucide-react';

export const Form = ({ celular, onSubmit, onCancel }: FormCelularProps) => {
  const [formData, setFormData] = useState({
    modelo: '',
    marca: '',
    ano: new Date().getFullYear(),
    preco: 0,
    armazenamento: '',
    ram: '',
    camera: '',
    bateria: '',
    tela: '',
    imagem: '',
    descricao: '',
    avaliacao: 0,
    favorito: false,
  });

  useEffect(() => {
    if (celular) {
      setFormData(celular);
    }
  }, [celular]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'number'
          ? parseFloat(value)
          : type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-3xl w-full my-8">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center rounded-t-xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {celular?.id ? 'Editar Celular' : 'Novo Celular'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Modelo e Marca */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Modelo *
              </label>
              <input
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Ex: iPhone 15 Pro Max"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Marca *
              </label>
              <select
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Selecione uma marca</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Xiaomi">Xiaomi</option>
                <option value="Motorola">Motorola</option>
                <option value="Google">Google</option>
                <option value="OnePlus">OnePlus</option>
                <option value="Realme">Realme</option>
                <option value="Asus">Asus</option>
                <option value="Sony">Sony</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
          </div>

          {/* Ano e Preço */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Ano *
              </label>
              <input
                type="number"
                name="ano"
                value={formData.ano}
                onChange={handleChange}
                required
                min="2015"
                max={new Date().getFullYear() + 1}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Preço (R$) *
              </label>
              <input
                type="number"
                name="preco"
                value={formData.preco}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="input-field"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Armazenamento e RAM */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Armazenamento *
              </label>
              <select
                name="armazenamento"
                value={formData.armazenamento}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Selecione</option>
                <option value="64GB">64GB</option>
                <option value="128GB">128GB</option>
                <option value="256GB">256GB</option>
                <option value="512GB">512GB</option>
                <option value="1TB">1TB</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                RAM *
              </label>
              <select
                name="ram"
                value={formData.ram}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Selecione</option>
                <option value="4GB">4GB</option>
                <option value="6GB">6GB</option>
                <option value="8GB">8GB</option>
                <option value="12GB">12GB</option>
                <option value="16GB">16GB</option>
              </select>
            </div>
          </div>

          {/* Câmera e Bateria */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Câmera Principal *
              </label>
              <input
                type="text"
                name="camera"
                value={formData.camera}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Ex: 48MP"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Bateria *
              </label>
              <input
                type="text"
                name="bateria"
                value={formData.bateria}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Ex: 4500mAh"
              />
            </div>
          </div>

          {/* Tela */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Tamanho da Tela *
            </label>
            <input
              type="text"
              name="tela"
              value={formData.tela}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Ex: 6.7\"
            />
          </div>

          {/* URL da Imagem */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              URL da Imagem *
            </label>
            <input
              type="url"
              name="imagem"
              value={formData.imagem}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="https://exemplo.com/celular.jpg"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Dica: Use Unsplash.com para imagens gratuitas
            </p>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Descrição *
            </label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
              rows={3}
              className="input-field resize-none"
              placeholder="Breve descrição do celular..."
            />
          </div>

          {/* Avaliação */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Avaliação (0-5)
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, avaliacao: star }))
                  }
                  className="p-2 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= formData.avaliacao
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Favorito */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="favorito"
              id="favorito"
              checked={formData.favorito}
              onChange={handleChange}
              className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label
              htmlFor="favorito"
              className="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer flex items-center gap-2"
            >
              <Heart className="w-4 h-4" />
              Marcar como favorito
            </label>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 btn-primary flex items-center justify-center gap-2">
              <Save className="w-5 h-5" />
              {celular?.id ? 'Atualizar' : 'Salvar'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 btn-secondary"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};