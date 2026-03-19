# 📋 GoTask

> Aplicação de gerenciamento de tarefas no estilo Kanban, construída com **Angular 19** e **Tailwind CSS**.

---

## 🚀 Sobre o Projeto

O **GoTask** é uma aplicação web de gerenciamento de tarefas inspirada no modelo Kanban. Com ela, é possível criar, editar, mover e comentar tarefas distribuídas em três colunas de status: **A Fazer**, **Em Andamento** e **Concluído**.

Todos os dados são persistidos no **LocalStorage** do navegador, garantindo que as tarefas não sejam perdidas ao recarregar a página.

---

## ✨ Funcionalidades

- ✅ **Criar tarefas** com nome e descrição
- ✏️ **Editar tarefas** existentes
- 🗑️ **Remover tarefas**
- 🔀 **Mover tarefas** entre colunas (A Fazer → Em Andamento → Concluído)
- 💬 **Adicionar e remover comentários** nas tarefas
- 💾 **Persistência de dados** via LocalStorage

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia                                                | Versão |
| --------------------------------------------------------- | ------ |
| [Angular](https://angular.dev/)                           | 19.x   |
| [Angular CDK](https://material.angular.io/cdk/categories) | 19.x   |
| [Tailwind CSS](https://tailwindcss.com/)                  | 4.x    |
| [RxJS](https://rxjs.dev/)                                 | 7.8.x  |
| [TypeScript](https://www.typescriptlang.org/)             | 5.7.x  |

---

## 📁 Estrutura do Projeto

O projeto segue a arquitetura **Feature-Based Components**, onde cada funcionalidade é organizada em seu próprio módulo isolado, contendo seus componentes, modelos, serviços e utilitários. Isso facilita a escalabilidade, manutenção e separação de responsabilidades.

```
src/
└── app/
    ├── core/                   # Módulo core da aplicação
    └── features/               # Módulos organizados por funcionalidade (Feature-Based)
        ├── layout/             # Feature de layout (header, main-content)
        └── task/               # Feature principal de tarefas
            ├── components/     # Componentes da feature (card, modais, seções)
            ├── models/         # Interfaces e enums
            ├── services/       # TaskService (lógica de negócio + LocalStorage)
            └── utils/          # Funções utilitárias (geração de ID único)
```

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos

- **Node.js** >= 18.x
- **npm** >= 9.x

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/go-task.git

# Acesse o diretório
cd go-task

# Instale as dependências
npm install
```

### Rodando em Desenvolvimento

```bash
npm start
```

Acesse em: [http://localhost:4200](http://localhost:4200)

### Build para Produção

```bash
npm run build
```

Os arquivos gerados estarão em `dist/`.

### Rodando os Testes

```bash
npm test
```

---
