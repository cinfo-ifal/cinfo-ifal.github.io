---
titulo: Manual de Publicação - Site CINFO
publicadoEm: 2026-02-18 14:34:00
modificadoEm: 2026-02-18 14:34:00
tags: [munual, tag2]
autoria: [ricardo_rubens_gomes_nunes_filho]
descricao: Orienta para publicação de conteúdos no site da Coordenação de Informática (CINFO)
---

# Manual de Publicação - Site CINFO

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
titulo: "Título da Notícia"
publicadoEm: 2026-02-11 14:34:00
modificadoEm: 2026-02-11 14:34:00
tags: [tag1, tag2]
autoria: [Nome do Autor]
foto: nome_da_imagem.jpg
descricao: Breve descrição da notícia.
---
```

#### Passo a Passo

1. Salvar a imagem na pasta correta
2. Criar arquivo `.md`
3. Utilizar o template correspondente
4. Preencher os metadados
5. Escrever o conteúdo
6. Commit e push

#### Exemplo

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

Conteúdo da notícia...
```

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
nome: Nome Completo do Professor
curriculoLattes: http://lattes.cnpq.br/0000000000000000
sitePessoal:
email: nome.sobrenome@ifal.edu.br
sigaa: https://sigaa.ifal.edu.br/sigaa/public/docente/portal.jsf?siape=0000000
ativo: true
foto: nome_do_professor.jpg
---
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
---
```

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
```

#### Passo a Passo

1. Salvar PDF na pasta correta
2. Criar arquivo `.md`
3. Preencher metadados
4. Inserir resumo
5. Commit e push

---

Fim do Manual.
