---
titulo: Manual de Publicação - Site CINFO
publicadoEm: 2026-02-18 07:00:00
modificadoEm: 2026-09-29 11:00:00
tags: [manual]
autoria: [Ricardo Nunes]
foto: manual.svg
descricao: Orienta para publicação de conteúdos no site da Coordenação de Informática (CINFO)
---

## 1. Apresentação

### Objetivo do manual

Este manual orienta professores e colaboradores na publicação de conteúdos no site da Coordenação de Informática (CINFO), garantindo padronização e autonomia na atualização das informações.

### Público-alvo

Professores e membros da coordenação que desejam publicar ou atualizar conteúdos como notícias, eventos, disciplinas, projetos, TCCs, professores e guias.

---

## 2. Como o site funciona

### Visão geral da arquitetura

O site é desenvolvido com Astro, Tailwind CSS e TypeScript. Todo o conteúdo é organizado dentro da pasta `src/content/`, separado por tipo.

### Papel do Markdown

Todo conteúdo é escrito em arquivos `.md`. Cada arquivo representa uma publicação individual.

Cada arquivo contém:

* Um bloco inicial de metadados (frontmatter)
* O conteúdo textual da publicação

### Papel do GitHub

Os arquivos são enviados para o repositório oficial. Cada atualização é feita por commit e push.

### Papel do processo de deploy

Após o envio, o processo automático de build gera o site estático atualizado.

O build **valida o conteúdo**: campo obrigatório ausente, data inválida ou referência a um professor/disciplina/curso que não existe fazem o build falhar. Nesse caso o site no ar não muda, e a aba *Actions* do GitHub mostra o arquivo e o campo com problema.

Para deixar um rascunho no repositório sem publicá-lo, há duas formas:

* **`rascunho: true` no frontmatter** (notícias, eventos, guias, projetos e TCCs). O site publicado ignora o arquivo, mas ele aparece normalmente no `npm run dev`, o que permite revisar a página antes de publicar. Para publicar, apague a linha ou troque para `rascunho: false`.
* **Nome do arquivo começando com `_`** (ex.: `_semana_academica_2026.md`), em qualquer coleção. O arquivo é ignorado inclusive no `npm run dev`. Para publicar, basta renomear.

### Fluxo resumido

Markdown → Commit → GitHub → Deploy automático → Site atualizado

---

## 3. Organização de Arquivos (Imagens e PDFs)

As mídias devem ser salvas na pasta `public/`, respeitando a organização abaixo:

```
public/
├── images/
│   ├── cursos/
│   ├── eventos/
│   ├── guias/
│   ├── informacoes/
│   ├── noticias/
│   ├── professores/
│   └── projetos/
└── pdfs/
    └── tccs/
```

### Regras

* Imagens devem ser salvas em `public/images/<tipo>/`
* PDFs de TCC devem ser salvos em `public/pdfs/tccs/`
* O nome do arquivo deve ser simples, sem espaços e sem acentuação
* O nome informado no frontmatter deve corresponder exatamente ao nome do arquivo salvo

---

## 4. Tipos de Conteúdo Disponíveis

* [Notícias](#notícias)
* [Professores](#professores)
* [Disciplinas](#disciplinas)
* [Eventos](#eventos)
* [Guias](#guias)
* [Projetos](#projetos)
* [TCCs](#tccs)

---

## 5. Guia de Publicação por Tipo de Conteúdo

### Notícias

#### Descrição

Publicações informativas e comunicados institucionais.

#### Local de Salvamento

`src/content/noticias/`

Imagens: `public/images/noticias/`

#### Template

```markdown
---
titulo: Semana Acadêmica de Tecnologia 2026
publicadoEm: 2026-03-10 10:00:00
modificadoEm: 2026-03-10 10:00:00
tags: [evento, tecnologia]
autoria: [Coordenação CINFO]
foto: semana_academica_2026.jpg
descricao: Evento voltado para inovação e desenvolvimento.
---

Conteúdo da notícia (utilizando markdown)...
```

#### Passo a Passo

1. Salvar a imagem na pasta correta
2. Criar arquivo `.md`
3. Utilizar o template correspondente
4. Preencher os metadados
5. Escrever o conteúdo
6. Commit e push

---

### Professores

#### Descrição

Cadastro institucional dos docentes.

#### Local de Salvamento

`src/content/professores/`

Imagens: `public/images/professores/`

#### Template

```markdown
---
nome: Ricardo Silva
curriculoLattes: http://lattes.cnpq.br/0000000000000000
sitePessoal:
email: ricardo.silva@ifal.edu.br
sigaa: https://sigaa.ifal.edu.br
ativo: true
foto: ricardo_silva.jpg
---

(CONTEÚDO UTILIZANDO MARKDOWN)

### Área de Atuação
- Engenharia de Software
- Arquitetura de Sistemas

### Biografia
Professor com experiência em desenvolvimento web e sistemas distribuídos.
```

#### Passo a Passo

1. Salvar a foto na pasta correta
2. Criar arquivo `.md`
3. Preencher metadados
4. Inserir biografia
5. Commit e push

---

### Disciplinas

#### Descrição

Informações acadêmicas das disciplinas.

#### Local de Salvamento

`src/content/disciplinas/`

#### Template

```markdown
---
titulo: Nome da Disciplina
cargaHoraria: 80
curso: sistemas_de_informacao
natureza: Obrigatória
modalidade: Presencial
preRequisitos: Sem pre-requisito
periodo: 1
professor: [nome_professor]
diasAula:
- 2N1234
---

(CONTEÚDO UTILIZANDO MARKDOWN)

### Ementa
...

```

#### Passo a Passo

1. Criar arquivo `.md`
2. Preencher metadados
3. Inserir ementa e bibliografia
4. Commit e push

---

### Eventos

#### Descrição

Divulgação de eventos acadêmicos.

#### Local de Salvamento

`src/content/eventos/`

Imagens: `public/images/eventos/`

#### Template

```markdown
---
titulo: Nome do Evento
dataInicio: 2026-03-20 08:00
dataFim: 2026-03-20 12:00
local: Local do Evento
foto: nome_da_imagem.png
tags: [tag1, tag2]
descricao: Resumo curto exibido no card da listagem de eventos (opcional).
---

DESCRIÇÃO DO EVENTO / PROGRAMAÇÃO (CONTEÚDO UTILIZANDO MARKDOWN)

```

Se `descricao` for omitida, o card usa o início do texto do evento.

A página de eventos e a página inicial separam os eventos pela data:

* **Próximos eventos:** os que ainda não terminaram (`dataFim` no futuro), do mais próximo ao mais distante. A página inicial mostra até 3. Sem eventos programados, a seção não aparece na página inicial.
* **Eventos realizados:** os que já terminaram, do mais recente ao mais antigo, 9 por página.

O site é estático. Por isso, um evento passa para "realizados" no build seguinte ao seu término. Além do build de cada publicação, o deploy roda automaticamente todo dia às 6h.

#### Passo a Passo

1. Salvar imagem
2. Criar arquivo `.md`
3. Preencher informações
4. Commit e push

---

### Guias

#### Descrição

Materiais didáticos e técnicos.

#### Local de Salvamento

`src/content/guias/`

Imagens: `public/images/guias/`

#### Template

```markdown
---
titulo: Título do Guia
publicadoEm: 2026-02-11 14:34:00
modificadoEm: 2026-02-11 14:34:00
tags: [tag1, tag2]
autoria: [Nome do Autor]
foto: nome_da_imagem.webp
descricao: Breve descrição do guia.
---

CONTEÚDO DO GUIA UTILIZANDO MARKDOWN...

```

#### Passo a Passo

1. Salvar imagem
2. Criar arquivo `.md`
3. Preencher metadados
4. Desenvolver conteúdo
5. Commit e push

---

### Projetos

#### Descrição

Projetos de ensino, pesquisa ou extensão.

#### Local de Salvamento

`src/content/projetos/`

Imagens: `public/images/projetos/`

#### Template

```markdown
---
titulo: Nome do Projeto
foto: nome_da_imagem.jpg
tipo: ensino
descricao: Breve descrição do projeto.
coordenador: Nome do Coordenador
integrantes: [Integrante 1, Integrante 2]
dataInicio: 2026-02-01
dataTermino: 2026-06-30
---

DESCRIÇÃO DO PROJETO UTILIZANDO MARKDOWN

```

#### Passo a Passo

1. Salvar imagem
2. Criar arquivo `.md`
3. Preencher informações
4. Inserir descrição
5. Commit e push

---

### TCCs

#### Descrição

Trabalhos de Conclusão de Curso.

#### Local de Salvamento

`src/content/tccs/`

PDF: `public/pdfs/tccs/`

#### Template

```markdown
---
titulo: Título do TCC
autores: [Nome do Autor]
orientador: Nome do Orientador
palavrasChave: [Palavra1, Palavra2]
arquivo: nome_do_arquivo.pdf
publicadoEm: 2026-01-20
---

INFORMAÇÕES SOBRE O TCC UTILIZANDO MARKDOWN

```

#### Passo a Passo

1. Salvar PDF na pasta correta
2. Criar arquivo `.md`
3. Preencher metadados
4. Inserir resumo
5. Commit e push

---

Fim do Manual.
