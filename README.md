# CINFO

Site institucional dos cursos de informática do IFAL (campus Maceió), desenvolvido com Astro e Tailwind CSS. Publicado em <https://cinfo-ifal.github.io/>.

## 📋 Sobre o Projeto

Este projeto apresenta informações sobre os cursos de:
- **Desenvolvimento de Sistemas**
- **Sistemas de Informação**

Incluindo disciplinas, professores, projetos, notícias, eventos, guias, TCCs e recursos educacionais.

## 🚀 Estrutura do Projeto

```text
cinfo-ifal.github.io/
├── public/
│   ├── images/           # Imagens organizadas por seção
│   │   ├── cursos/
│   │   ├── eventos/
│   │   ├── guias/
│   │   ├── informacoes/
│   │   ├── noticias/
│   │   ├── professores/
│   │   └── projetos/
│   └── pdfs/
│       └── tccs/         # Trabalhos de Conclusão de Curso
├── src/
│   ├── components/       # Componentes reutilizáveis Astro
│   ├── content/          # Conteúdo do site (Markdown/JSON)
│   │   ├── config.ts     # Schemas das coleções (validados no build)
│   │   ├── aulas/        # Horários das aulas do DS (JSON)
│   │   ├── cursos/
│   │   ├── disciplinas/
│   │   ├── eventos/
│   │   ├── guias/
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
- **Content Collections** - Gerenciamento de conteúdo com schemas validados

## 📦 Instalação

Requer Node.js 18.17.1+, 20.3+ ou ≥ 21.

```bash
npm install
```

## 🧞 Comandos Disponíveis

| Comando              | Ação                                                        |
| :------------------- | :---------------------------------------------------------- |
| `npm install`        | Instala as dependências do projeto                          |
| `npm run dev`        | Inicia servidor local em `localhost:4321`                   |
| `npm run build`      | Verifica tipos e conteúdo e gera o site em `./dist/`        |
| `npm run preview`    | Visualiza o build de produção localmente                    |
| `npm run astro ...`  | Executa comandos CLI do Astro                               |

## 📝 Gerenciamento de Conteúdo

> O passo a passo completo está no **Manual de Publicação**, publicado no próprio site em [`/publicacoes/guias/manual_site_cinfo`](https://cinfo-ifal.github.io/publicacoes/guias/manual_site_cinfo) (arquivo `src/content/guias/manual_site_cinfo.md`). Ao mudar campos ou regras de conteúdo, atualize o manual junto.

Cada publicação é um arquivo `.md` em `src/content/<tipo>/`. O **nome do arquivo** (minúsculas, sem acentos nem espaços, palavras separadas por `_`) vira a URL. O frontmatter é **validado no build** (`src/content/config.ts`): campo faltando, data inválida ou referência a professor/disciplina inexistente faz o build falhar, com mensagem indicando o arquivo e o campo.

Regras gerais:
- `foto` e `arquivo` levam **só o nome do arquivo**, que deve estar em `public/images/<tipo>/` (ou `public/pdfs/tccs/`).
- Referências a professores, cursos e disciplinas usam o **slug** (nome do arquivo sem `.md`).
- Datas no horário de Maceió: `AAAA-MM-DD HH:MM:SS` ou `AAAA-MM-DD HH:MM`; só a data em projetos e TCCs.
- Para deixar um rascunho no repositório sem publicar: `rascunho: true` no frontmatter (notícias, eventos, guias, projetos e TCCs; aparece só no `npm run dev`) ou nome do arquivo começando com `_` (ignorado sempre).
- Notícias são paginadas de 12 em 12 e eventos realizados de 9 em 9 (`src/servicos/publicacoes.ts`). Eventos com `dataFim` futura aparecem em "Próximos eventos", também na página inicial; o deploy roda diariamente para atualizar essa separação.

### Notícia — `src/content/noticias/`

```markdown
---
titulo: Semana Acadêmica de Tecnologia 2026
publicadoEm: 2026-03-10 10:00:00
modificadoEm: 2026-03-10 10:00:00
tags: [evento, tecnologia]
autoria: [Coordenação CINFO]
foto: semana_academica_de_tecnologia_2026.jpg
descricao: Evento voltado para inovação e desenvolvimento.
---

Conteúdo da notícia em Markdown...
```

### Evento — `src/content/eventos/`

```markdown
---
titulo: Palestra Segurança em Aplicações Web
dataInicio: 2026-04-20 19:00
dataFim: 2026-04-20 21:00
local: Auditório do IFAL Campus Maceió
foto: palestra_seguranca_em_aplicacoes_web.png
tags: [palestra, seguranca]
descricao: Resumo exibido no card da listagem (opcional).
---

Descrição e programação do evento...
```

### Professor — `src/content/professores/`

```markdown
---
nome: Nome Completo
curriculoLattes: http://lattes.cnpq.br/0000000000000000
sitePessoal:
email: nome@ifal.edu.br
sigaa:
ativo: true
foto: nome_completo.jpg
---

### Área de Atuação
- ...

### Biografia
...
```

`ativo: false` retira o professor da página inicial e da listagem (a página individual continua acessível). As disciplinas de um professor são as que o citam no campo `professor`.

### Disciplina — `src/content/disciplinas/`

```markdown
---
titulo: Programação Orientada a Objetos
cargaHoraria: 80
curso: sistemas_de_informacao
natureza: Obrigatória
modalidade: Presencial
preRequisitos: lnpg109
periodo: 4
professor: [fernando_kenji_kamei]
diasAula:
- 6N1234
---

### Ementa
...
```

`preRequisitos`: slug de uma disciplina ou `Sem pre-requisito`. `diasAula` (quadro do SI): `<dia 2–6>N<aulas 1–4>`.

Templates de guias, projetos e TCCs: veja os arquivos existentes em `src/content/` e o schema em `src/content/config.ts`.

## 🌐 Deploy

A cada push na branch `main`, o GitHub Actions (`.github/workflows/deploy.yml`) executa `npm run build` e publica no GitHub Pages. Se o build falhar (por exemplo, por conteúdo inválido), o site no ar não é alterado.

O site precisa estar na raiz de um domínio (`<conta>.github.io` ou domínio próprio), pois os links internos são absolutos (`/images/...`, `/publicacoes/...`).

## 📄 Licença

Projeto educacional - Cursos de Informática
