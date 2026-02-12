import { z, defineCollection, reference } from "astro:content";

const ColecaoNoticias = defineCollection({
    type: "content",
    schema: {
        titulo: z.string(),
        publicadoEm: z.date(),
        modificadoEm: z.date(),
        tags: z.array(z.string()),
        autoria: z.array(z.string()),
        foto: z.string(),
        descricao: z.string(),
    },
});

const ColecaoCursos = defineCollection({
    type: "content",
    schema: {
        titulo: z.string(),
        nivel: z.string(),
        turno: z.string(),
        cargaHoraria: z.string(),
        duracao: z.string(),
        modalidade: z.string(),
        vagas: z.number(),
        telefone: z.string(),
        foto: z.string(),
        email: z.string(),
        coordenador: z.string(),
        monitor: z.string(),
        horariosMonitoria: z.string(),
    },
});

const ColecaoProfessores = defineCollection({
    type: "content",
    schema: {
        nome: z.string(),
        curriculoLattes: z.string(),
        sitePessoal: z.string(),
        email: z.string(),
        sigaa: z.string(),
        foto: z.string(),
        ativo: z.boolean(),
        discplinas: z.array(reference("disciplinas")),
    },
});

const ColecaoDisciplinas = defineCollection({
    type: "content",
    schema: {
        titulo: z.string(),
        cargaHoraria: z.number(),
        curso: z.string(),
        natureza: z.string(),
        modalidade: z.string(),
        preRequisito: reference("disciplinas").optional(),
        periodo: z.number(),
        professor: z.array(reference("professores").optional()),
        diasAula: z.array(z.string()),
    },
});


const ColecaoEventos = defineCollection({
    type: "content",
    schema: {
        titulo: z.string(),
        dataInicio: z.date(),
        dataFim: z.date(),
        local: z.string(),
        foto: z.string(),
        tags: z.array(z.string()),
    },
});

const ColecaoGuias = defineCollection({
    type: "content",
    schema: {
        titulo: z.string(),
        publicadoEm: z.date(),
        modificadoEm: z.date(),
        tags: z.array(z.string()),
        autoria: z.array(z.string()),
        foto: z.string(),
        descricao: z.string(),
    },
});

const ColecaoTcc = defineCollection({
    type: "content",
    schema: {
        titulo: z.string(),
        autores: z.array(z.string()),
        orientador: z.string(),
        palavrasChave: z.array(z.string()),
        arquivo: z.string(),
        publicadoEm: z.date(),
    },
});

const colecaoProjetos = defineCollection({
    type: "content",
    schema: {
        titulo: z.string(),
        foto: z.string(),
        tipo: z.enum(["pesquisa", "extensao", "ensino"]),
        descricao: z.string(),
        coordenador: z.string(),
        integrantes: z.array(z.string()),
        dataInicio: z.date(),
        dataTermino: z.date(),
    },
})


const colecaoAulas = defineCollection({
    type: "content",
    schema: {
        curso: z.string(),
        turma: z.string(),
        inicio: z.string(),
        termino: z.string(),
        grupo: z.string(),
        disciplina: z.string(),
        professor: z.string(),
    },
});


export const collection = {
    professores: ColecaoProfessores,
    cursos: ColecaoCursos,
    disciplinas: ColecaoDisciplinas,
    noticias: ColecaoNoticias,
    eventos: ColecaoEventos,
    guias: ColecaoGuias,
    tccs: ColecaoTcc,
    projetos: colecaoProjetos,
    aulas: colecaoAulas,
};
