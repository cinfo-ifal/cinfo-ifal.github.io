import { z, defineCollection, reference } from "astro:content";

// Datas são escritas como horário local de Maceió ("2026-03-10 10:00" ou "2026-03-10 10:00:00")
// e tratadas como UTC de ponta a ponta, para que o valor exibido seja exatamente o digitado,
// independente do fuso da máquina que faz o build (ver servicos/utils.ts).
const data = z.preprocess((valor) => {
    if (typeof valor !== "string") return valor;
    const texto = valor.trim().replace(" ", "T");
    return new Date(/(Z|[+-]\d{2}:?\d{2})$/.test(texto) ? texto : `${texto}Z`);
}, z.date({ invalid_type_error: "data inválida (use AAAA-MM-DD ou AAAA-MM-DD HH:MM[:SS])" }));

// Campos opcionais escritos vazios no YAML (ex.: "sitePessoal:") chegam como null.
const textoOpcional = z.string().nullish().transform((valor) => valor || undefined);

// Referência que aceita "Sem ..." (ex.: "Sem pre-requisito", "sem professor") ou vazio como ausência;
// qualquer outro valor precisa ser o slug de uma entrada existente, senão o build falha.
const referenciaOpcional = <C extends "disciplinas" | "professores">(colecao: C) =>
    z.preprocess(
        (valor) => (typeof valor !== "string" || valor.trim() === "" || /^sem\b/i.test(valor) ? undefined : valor),
        reference(colecao).optional()
    );

const ColecaoNoticias = defineCollection({
    type: "content",
    schema: z.object({
        titulo: z.string(),
        publicadoEm: data,
        modificadoEm: data,
        tags: z.array(z.string()),
        autoria: z.array(z.string()),
        foto: z.string(),
        descricao: z.string(),
    }),
});

const ColecaoCursos = defineCollection({
    type: "content",
    schema: z.object({
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
        coordenador: reference("professores"),
        monitor: textoOpcional,
        horariosMonitoria: textoOpcional,
    }),
});

const ColecaoProfessores = defineCollection({
    type: "content",
    schema: z.object({
        nome: z.string(),
        curriculoLattes: textoOpcional,
        sitePessoal: textoOpcional,
        email: z.string().email(),
        sigaa: textoOpcional,
        foto: z.string(),
        ativo: z.boolean().default(true),
    }),
});

const ColecaoDisciplinas = defineCollection({
    type: "content",
    schema: z.object({
        titulo: z.string(),
        cargaHoraria: z.number(),
        curso: reference("cursos"),
        natureza: z.string(),
        modalidade: z.string(),
        preRequisitos: referenciaOpcional("disciplinas"),
        periodo: z.number(),
        professor: z.array(reference("professores")),
        diasAula: z.array(z.string().regex(/^[2-6]N[1-4]+$/, "use <dia 2-6>N<aulas 1-4>, ex.: 3N12")).nullish(),
    }),
});

const ColecaoEventos = defineCollection({
    type: "content",
    schema: z.object({
        titulo: z.string(),
        dataInicio: data,
        dataFim: data,
        local: z.string(),
        foto: z.string(),
        tags: z.array(z.string()),
        descricao: z.string().optional(),
    }),
});

const ColecaoGuias = defineCollection({
    type: "content",
    schema: z.object({
        titulo: z.string(),
        publicadoEm: data,
        modificadoEm: data,
        tags: z.array(z.string()),
        autoria: z.array(z.string()),
        foto: z.string(),
        descricao: z.string(),
    }),
});

const ColecaoTcc = defineCollection({
    type: "content",
    schema: z.object({
        titulo: z.string(),
        autores: z.array(z.string()),
        orientador: z.string(),
        palavrasChave: z.array(z.string()),
        arquivo: z.string(),
        publicadoEm: data,
    }),
});

const ColecaoProjetos = defineCollection({
    type: "content",
    schema: z.object({
        titulo: z.string(),
        foto: z.string(),
        tipo: z.enum(["pesquisa", "extensao", "ensino"]),
        descricao: z.string(),
        coordenador: z.string(),
        integrantes: z.array(z.string()),
        dataInicio: data,
        dataTermino: data,
    }),
});

// Cada arquivo (segunda.json … sexta.json) é a lista de aulas do dia no curso de DS.
const ColecaoAulas = defineCollection({
    type: "data",
    schema: z.array(
        z.object({
            curso: z.string(),
            turma: z.string(),
            inicio: z.string(),
            termino: z.string(),
            grupo: z.string(),
            disciplina: reference("disciplinas"),
            professor: referenciaOpcional("professores"),
        })
    ),
});

export const collections = {
    professores: ColecaoProfessores,
    cursos: ColecaoCursos,
    disciplinas: ColecaoDisciplinas,
    noticias: ColecaoNoticias,
    eventos: ColecaoEventos,
    guias: ColecaoGuias,
    tccs: ColecaoTcc,
    projetos: ColecaoProjetos,
    aulas: ColecaoAulas,
};
