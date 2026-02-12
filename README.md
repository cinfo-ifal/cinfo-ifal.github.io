# CINFO

Site institucional dos cursos de informática, desenvolvido com Astro e Tailwind CSS.

## 📋 Sobre o Projeto

Este projeto apresenta informações sobre os cursos de:
- **Desenvolvimento de Sistemas**
- **Sistemas de Informação**

Incluindo disciplinas, professores, projetos, notícias, eventos, TCCs e recursos educacionais.

## 🚀 Estrutura do Projeto

```text
cinfo-astro/
├── public/
│   ├── images/           # Imagens organizadas por seção
│   │   ├── cursos/
│   │   ├── eventos/
│   │   ├── noticias/
│   │   ├── professores/
│   │   └── projetos/
│   └── pdfs/
│       └── tccs/         # Trabalhos de Conclusão de Curso
├── src/
│   ├── components/       # Componentes reutilizáveis Astro
│   │   ├── cabecalho.astro
│   │   ├── rodape.astro
│   │   ├── cartao-*.astro
│   │   └── ...
│   ├── content/          # Conteúdo do site (Markdown/JSON)
│   │   ├── aulas/        # Horários das aulas
│   │   ├── cursos/       # Informações dos cursos
│   │   ├── disciplinas/  # Ementas e materiais
│   │   ├── eventos/
│   │   ├── noticias/
│   │   ├── professores/
│   │   ├── projetos/
│   │   └── tccs/
│   ├── layouts/          # Layouts base
│   ├── pages/            # Páginas do site (rotas)
│   └── servicos/         # Serviços e utilitários
└── package.json
```

## 🛠️ Tecnologias

- **[Astro](https://astro.build)** - Framework web estático
- **[Tailwind CSS](https://tailwindcss.com)** - Framework CSS utilitário
- **TypeScript** - Tipagem estática
- **Content Collections** - Gerenciamento de conteúdo

## 📦 Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

## 🧞 Comandos Disponíveis

| Comando              | Ação                                              |
| :------------------- | :------------------------------------------------ |
| `npm install`        | Instala as dependências do projeto                |
| `npm run dev`        | Inicia servidor local em `localhost:4321`         |
| `npm run build`      | Gera build de produção em `./dist/`               |
| `npm run preview`    | Visualiza build de produção localmente            |
| `npm run astro ...`  | Executa comandos CLI do Astro                     |

## 📝 Gerenciamento de Conteúdo

### Adicionar uma Notícia

Crie um arquivo `.md` em `src/content/noticias/`:

```markdown
---
titulo: "Título da Notícia"
descricao: "Breve descrição"
data: 2026-02-11
imagem: "/images/noticias/imagem.jpg"
---

Conteúdo da notícia...
```

### Adicionar um Professor

Crie um arquivo `.md` em `src/content/professores/`:

```markdown
---
nome: "Nome do Professor"
email: "email@exemplo.com"
foto: "/images/professores/foto.jpg"
---

Biografia e informações...
```

### Adicionar uma Disciplina

Crie um arquivo `.md` em `src/content/disciplinas/` seguindo o padrão dos códigos existentes.

## 🌐 Deploy

Após o build, o conteúdo da pasta `dist/` pode ser hospedado em qualquer servidor web estático.

## 📄 Licença

Projeto educacional - Cursos de Informática
