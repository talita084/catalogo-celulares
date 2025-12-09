export interface Celular {
  id?: number;
  modelo: string;
  marca: string;
  ano: number;
  preco: number;
  armazenamento: string;
  ram: string;
  camera: string;
  bateria: string;
  tela: string;
  imagem: string;
  descricao: string;
  avaliacao: number;
  favorito: boolean;
}

export interface FormCelularProps {
  celular?: Celular;
  onSubmit: (celular: Celular) => Promise<void>;
  onCancel: () => void;
}