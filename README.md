# 🌱 Instituto MudaDepois

## Transformando Pequenas Ações em Grandes Mudanças

O **Instituto MudaDepois** é uma plataforma digital desenvolvida com o propósito de conectar pessoas, projetos sociais e iniciativas sustentáveis, incentivando a participação da comunidade em ações capazes de gerar impacto positivo na sociedade.

A proposta do projeto é utilizar a tecnologia como ferramenta de transformação social, aproximando cidadãos, voluntários e instituições em um ambiente acessível, intuitivo e colaborativo.

Mais do que um aplicativo, o Instituto MudaDepois busca promover uma cultura de responsabilidade social, sustentabilidade e cidadania, demonstrando como pequenas ações individuais podem contribuir para a construção de um mundo melhor.

---

# 🎯 Objetivo do Projeto

O principal objetivo da plataforma é disponibilizar um ambiente digital capaz de:

* Divulgar projetos sociais e ambientais;
* Facilitar a participação de voluntários;
* Centralizar informações sobre campanhas e ações;
* Incentivar práticas sustentáveis;
* Aproximar organizações e comunidade;
* Promover conscientização social através da tecnologia.

O sistema foi desenvolvido como projeto acadêmico da disciplina de **Desenvolvimento para Dispositivos Móveis**, aplicando conceitos modernos de desenvolvimento mobile, banco de dados, arquitetura de software e experiência do usuário.

---

# 📱 Tecnologias Utilizadas

## Front-end Mobile

### React Native

Framework utilizado para desenvolvimento do aplicativo mobile multiplataforma.

Benefícios:

* Código único para Android e iOS;
* Componentização;
* Alta produtividade;
* Grande comunidade.

### Expo

Plataforma utilizada para simplificar o desenvolvimento, testes e execução do aplicativo.

Recursos utilizados:

* Navegação;
* Build do aplicativo;
* Gerenciamento de dependências;
* Emulação e testes.

### TypeScript

Utilizado para aumentar a segurança do código através da tipagem estática.

Benefícios:

* Menor quantidade de erros;
* Melhor manutenção;
* Maior legibilidade.

---

# 🗄️ Banco de Dados SQL

O projeto utiliza um banco de dados relacional para armazenamento persistente das informações.

## Por que utilizar SQL?

O banco relacional foi escolhido devido à necessidade de manter integridade dos dados e relacionamentos entre entidades do sistema.

Entre os dados armazenados estão:

* Usuários;
* Informações de cadastro;
* Dados de autenticação;
* Projetos cadastrados;
* Participações em campanhas;
* Histórico de ações.

---

## Estrutura Relacional

Exemplo simplificado:

### Usuários

| Campo | Tipo    |
| ----- | ------- |
| id    | INTEGER |
| nome  | VARCHAR |
| email | VARCHAR |
| senha | VARCHAR |

### Projetos

| Campo     | Tipo    |
| --------- | ------- |
| id        | INTEGER |
| titulo    | VARCHAR |
| descricao | TEXT    |
| categoria | VARCHAR |

### Participações

| Campo      | Tipo    |
| ---------- | ------- |
| id         | INTEGER |
| usuario_id | INTEGER |
| projeto_id | INTEGER |

Relacionamentos:

```text
Usuário
   │
   ├──── Participações
   │
Projeto
```

Essa estrutura permite que um usuário participe de diversos projetos e que um projeto possua vários participantes.

---

# 🏗️ Arquitetura da Aplicação

A aplicação foi organizada seguindo o princípio de separação de responsabilidades.

```text
Usuário
   │
   ▼
Telas (Screens)
   │
   ▼
Componentes
   │
   ▼
Serviços
   │
   ▼
Banco de Dados SQL
```

Cada camada possui uma responsabilidade específica, facilitando manutenção, escalabilidade e reutilização de código.

---

# 📂 Estrutura do Projeto

```text
src
│
├── screens
│   ├── Home
│   ├── Login
│   ├── Cadastro
│   ├── Perfil
│   └── Projetos
│
├── components
│   ├── Button
│   ├── Card
│   ├── Input
│   └── Header
│
├── services
│   ├── ApiService
│   └── DatabaseService
│
├── navigation
│   └── AppNavigator
│
├── contexts
│   └── AuthContext
│
├── hooks
│
├── styles
│
└── assets
```

---

# 🔍 Explicação Técnica da Estrutura

## Screens

Responsáveis pela interface visual apresentada ao usuário.

Exemplos:

* Tela de Login
* Tela de Cadastro
* Tela Principal
* Tela de Projetos

Cada screen representa uma funcionalidade específica do sistema.

---

## Components

Contêm componentes reutilizáveis da aplicação.

Exemplos:

* Botões personalizados;
* Campos de entrada;
* Cartões de exibição;
* Cabeçalhos.

Benefícios:

* Reutilização;
* Padronização visual;
* Facilidade de manutenção.

---

## Navigation

Gerencia a navegação entre telas.

Permite:

* Navegação por pilha (Stack Navigation);
* Navegação por abas (Tab Navigation);
* Controle de fluxo de autenticação.

---

## Services

Camada responsável pela comunicação com banco de dados e APIs.

Funções:

* Consultas SQL;
* Inserção de registros;
* Atualização de dados;
* Exclusão de informações.

Essa separação evita que regras de acesso aos dados fiquem misturadas com a interface.

---

## Context API

Responsável pelo gerenciamento global de estado.

Exemplos:

* Usuário autenticado;
* Dados compartilhados entre telas;
* Configurações do aplicativo.

---

# ✨ Funcionalidades

* Cadastro de usuários;
* Login e autenticação;
* Gerenciamento de projetos;
* Consulta de informações;
* Navegação entre módulos;
* Persistência em banco SQL;
* Interface responsiva;
* Componentização reutilizável.

---

# 🎓 Conceitos Aplicados

Durante o desenvolvimento foram aplicados conceitos importantes de engenharia de software:

* Desenvolvimento Mobile;
* Programação Orientada a Objetos;
* Componentização;
* Arquitetura em Camadas;
* Banco de Dados Relacional;
* Persistência de Dados;
* Navegação entre Telas;
* Gerenciamento de Estado;
* Boas Práticas de Código;
* Versionamento com Git e GitHub.

---

# 🚀 Como Executar o Projeto

## Clonar Repositório

```bash
git clone https://github.com/GuhSA/Instituto_MudaDepois.git
```

## Instalar Dependências

```bash
npm install
```

## Executar Projeto

```bash
npx expo start
```

---

# 👨‍💻 Equipe de Desenvolvimento

Projeto desenvolvido por **@Ana Carolina Muniz** e **@Gustavo Alves**  para a disciplina de **Desenvolvimento para Dispositivos Móveis**, com foco na aplicação prática dos conhecimentos adquiridos ao longo do curso.

---

# 🌍 Impacto Social

O Instituto MudaDepois demonstra como a tecnologia pode ser utilizada para promover transformação social.
A plataforma busca incentivar a participação cidadã, fortalecer iniciativas comunitárias e criar conexões entre pessoas que desejam contribuir para um futuro mais sustentável e solidário.
E insentivar para que as pessoas possam trabalhar e reconstuir sua vida mesmo tendo muito pouco ou nada.
Porque mudar o mundo começa com pequenas atitudes.
