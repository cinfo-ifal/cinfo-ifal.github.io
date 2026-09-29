import { getCollection, type CollectionEntry } from "astro:content";

// Coleções que aceitam o campo "rascunho" (ver content/config.ts).
export type ColecaoComRascunho = "noticias" | "eventos" | "guias" | "projetos" | "tccs";

// Entradas publicadas. Com "rascunho: true" a entrada aparece só no `npm run dev` (para revisar
// antes de publicar); o build do site publicado não gera página nem card para ela.
// Arquivos com prefixo "_" nem chegam aqui: o Astro os ignora sempre.
export async function publicados<C extends ColecaoComRascunho>(colecao: C): Promise<CollectionEntry<C>[]> {
    const entradas: CollectionEntry<C>[] = await getCollection(colecao);
    return entradas.filter((entrada) => import.meta.env.DEV || !entrada.data.rascunho);
}

// Momento atual na mesma convenção das datas do conteúdo: horário de Maceió (UTC-3, sem horário
// de verão) armazenado como se fosse UTC (ver content/config.ts e servicos/utils.ts).
export function agoraNoHorarioDoConteudo(): Date {
    return new Date(Date.now() - 3 * 60 * 60 * 1000);
}

// Próximos (inclui os em andamento), do mais próximo ao mais distante, e realizados, do mais recente ao mais antigo.
// O site é estático: a separação vale para o momento do build (o deploy roda também uma vez por dia).
export function separarEventos(eventos: CollectionEntry<"eventos">[], agora = agoraNoHorarioDoConteudo()) {
    const proximos = eventos
        .filter((evento) => evento.data.dataFim >= agora)
        .sort((a, b) => a.data.dataInicio.getTime() - b.data.dataInicio.getTime());
    const realizados = eventos
        .filter((evento) => evento.data.dataFim < agora)
        .sort((a, b) => b.data.dataInicio.getTime() - a.data.dataInicio.getTime());
    return { proximos, realizados };
}

// Itens por página nas listagens paginadas.
export const ITENS_POR_PAGINA = { noticias: 12, eventos: 9 };
