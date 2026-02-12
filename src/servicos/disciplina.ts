import { getCollection } from "astro:content";

export interface Disciplina {
    titulo: string;
    cargaHoraria: number;
    curso: string;
    natureza: string;
    modalidade: string;
    preRequisitos: string;
    periodo: number;
    professor: string;
    codigo: string;
    diasAula: string[];
}

export interface DisciplinaPorPeriodo {
    periodo: number;
    disciplinas: Disciplina[];
}

export async function pegarDisciplinasPorCurso(slugCurso: string): Promise<Disciplina[]> {
    const disciplinas = await getCollection("disciplinas", ({ data }) => data.curso === slugCurso);
    return disciplinas.map((disciplina) => {
        return {
            titulo: disciplina.data.titulo,
            cargaHoraria: disciplina.data.cargaHoraria,
            curso: disciplina.data.curso,
            natureza: disciplina.data.natureza,
            modalidade: disciplina.data.modalidade,
            preRequisitos: disciplina.data.preRequisitos,
            periodo: disciplina.data.periodo,
            professor: disciplina.data.professor,
            codigo: disciplina.slug,
            diasAula: disciplina.data.diasAula,
        };
    });
}

function agruparDisciplinasPorPeriodo(disciplinas: Disciplina[]): DisciplinaPorPeriodo[] {
    const periodos = disciplinas.map((disciplina) => disciplina.periodo);
    const periodosUnicos = [...new Set(periodos)];
    const disciplinasPorPeriodo: DisciplinaPorPeriodo[] = periodosUnicos.map((periodo) => {
        const disciplinasDoPeriodo = disciplinas.filter(
            (disciplina) => disciplina.periodo === periodo
        );
        return {
            periodo,
            disciplinas: disciplinasDoPeriodo,
        };
    });
    return disciplinasPorPeriodo.sort((a, b) => a.periodo - b.periodo);
}

function quadroDoPeriodo(disciplinasPorPeriodo: DisciplinaPorPeriodo): Disciplina[][] {
    const quadroPorPeriodo: Disciplina[][] = Array.from({ length: 4 }, () => Array(5).fill(null));

    disciplinasPorPeriodo.disciplinas.forEach((disciplina) => {
        disciplina?.diasAula?.forEach((dia) => {
            const [diaSemana, aulas] = dia.split("N");
            const diaSemanaIndex = parseInt(diaSemana, 10) - 2;
            aulas.split("").forEach((aula) => {
                const aulaIndex = parseInt(aula, 10) - 1;
                if (diaSemanaIndex >= 0 && diaSemanaIndex < 5 && aulaIndex >= 0 && aulaIndex < 4) {
                    quadroPorPeriodo[aulaIndex][diaSemanaIndex] = disciplina;
                }
            });
        });
    });
    return quadroPorPeriodo;
}

export function gerarQuadroGeral(disciplinas: Disciplina[]): Disciplina[][][] {
    const disciplinasPorPeriodo = agruparDisciplinasPorPeriodo(disciplinas);
    const quadroGeral = disciplinasPorPeriodo.map((disciplinaPerios) => {
        return quadroDoPeriodo(disciplinaPerios);
    });
    return quadroGeral;
}
