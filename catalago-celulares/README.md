# Tech Store - Catálogo de Celulares

![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-a855f7?logo=tailwindcss)
![JSON Server](https://img.shields.io/badge/JSON_Server-1.0-green)

Sistema completo de gerenciamento de catálogo de smartphones desenvolvido com React, TypeScript, Tailwind CSS (tema roxo) e JSON Server. Permite criar, visualizar, editar e excluir celulares com persistência de dados local.

## Funcionalidades

- **CRUD Completo**: Criar, Ler, Atualizar e Deletar celulares
- **Dark Mode**: Tema escuro/claro com persistência
- **Sistema de Busca**: Buscar por modelo ou marca
- **Filtros Avançados**: Filtrar por marca, favoritos e ordenar
- **Sistema de Avaliação**: Avalie de 1 a 5 estrelas
- **Favoritos**: Marque seus celulares preferidos
- **Dashboard**: Estatísticas do catálogo
- **Responsivo**: Interface adaptável para todos os dispositivos
- **UI Moderna**: Design com tema roxo elegante
- **Performance**: Otimizado com React + Vite

## Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool rápido e moderno
- **Tailwind CSS** - Framework CSS utility-first (tema roxo)
- **JSON Server** - API REST fake para desenvolvimento
- **React Router** - Roteamento entre páginas
- **Lucide React** - Ícones modernos
- **Context API** - Gerenciamento de estado (Dark Mode)

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/catalogo-celulares.git
cd catalogo-celulares
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute o JSON Server

Em um terminal:

```bash
npm run server
```

O servidor estará rodando em `http://localhost:3000`

### 4. Execute a aplicação

Em outro terminal:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### 5. Ou execute ambos simultaneamente

```bash
npm install -g concurrently
npm start
```

## Estrutura do Projeto

```
catalogo-celulares/
┣ 📂 src/
┃ ┣ 📂 components/
┃ ┃ ┣ 📄 Card.tsx          # Card de exibição do celular
┃ ┃ ┣ 📄 Form.tsx          # Formulário de cadastro/edição
┃ ┃ ┗ 📄 Header.tsx        # Cabeçalho com navegação
┃ ┣ 📂 contexts/
┃ ┃ ┗ 📄 ThemeContext.tsx  # Context para Dark Mode
┃ ┣ 📂 pages/
┃ ┃ ┣ 📄 Home.tsx          # Página inicial com dashboard
┃ ┃ ┗ 📄 List.tsx          # Página de listagem e CRUD
┃ ┣ 📂 services/
┃ ┃ ┗ 📄 api.ts            # Serviço de comunicação com API
┃ ┣ 📂 types/
┃ ┃ ┗ 📄 index.ts          # Tipos TypeScript
┃ ┣ 📄 App.tsx             # Componente principal
┃ ┣ 📄 main.tsx            # Ponto de entrada
┃ ┗ 📄 index.css           # Estilos globais
┣ 📄 db.json                # Banco de dados JSON
┣ 📄 tailwind.config.js     # Configuração Tailwind (tema roxo)
┣ 📄 package.json           # Dependências do projeto
┗ 📄 README.md              # Documentação
```

## Funcionalidades Detalhadas

### Listagem de Celulares
- Grid responsivo com cards elegantes
- Imagem, modelo, marca, especificações
- Sistema de avaliação com estrelas
- Badge de favorito
- Preço destacado

### Adicionar Celular
- Formulário completo com validação
- Campos: modelo, marca, ano, preço, armazenamento, RAM, câmera, bateria, tela
- Sistema de avaliação interativo
- Checkbox para favoritos

### Editar Celular
- Edição através dos cards
- Formulário pré-preenchido
- Atualização em tempo real

### Deletar Celular
- Confirmação de segurança
- Remoção instantânea

### Busca e Filtros
- Busca por modelo ou marca
- Filtro por marca
- Filtro por favoritos
- Ordenação por modelo, preço ou ano

### Dashboard
- Total de celulares
- Quantidade de favoritos
- Preço médio
- Número de marcas

## Tema Roxo Personalizado

O projeto utiliza uma paleta de cores roxa elegante:

```javascript
primary: {
  500: '#a855f7',  // Roxo principal
  600: '#9333ea',  // Roxo escuro
  700: '#7e22ce',  // Roxo mais escuro
}
```

## Solução de Problemas

### Erro: "Failed to fetch"
- Verifique se o JSON Server está rodando na porta 3000
- Execute: `npm run server`

### Porta já em uso
- Altere a porta no package.json ou finalize o processo

### Erros de TypeScript
- Execute: `npm install` novamente
- Verifique a versão do Node.js

## Melhorias Futuras

- [ ] Comparar celulares lado a lado
- [ ] Upload de imagens local
- [ ] Gráficos de comparação de preços
- [ ] Sistema de notificações
- [ ] Exportar catálogo para PDF
- [ ] Integração com APIs de preços

## Autor

**Talita de Almeida Moura**
- GitHub: [@talita084](https://github.com/talita084)

## Licença

Este projeto está sob a licença MIT.

## Agradecimentos

- Projeto desenvolvido para a disciplina de Frameworks Front-End
- Professor: Renato Freire
- Uninassau Natal/RN

---

⭐ Se este projeto te ajudou, não esqueça de dar uma estrela!

## Comandos Rápidos

```bash
# Instalar dependências
npm install

# Rodar desenvolvimento
npm run dev

# Rodar JSON Server
npm run server

# Rodar ambos
npm start

# Build para produção
npm run build
```

**URL da aplicação**: http://localhost:5173  
**URL da API**: http://localhost:3000/celulares