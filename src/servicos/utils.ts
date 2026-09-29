// As datas do conteúdo são digitadas no horário de Maceió e armazenadas como UTC (ver content/config.ts).
// Formatar em UTC exibe exatamente o que foi digitado, qualquer que seja o fuso da máquina do build.
export function dataParaLocalString(data: Date, comHora = true): string {
    return data.toLocaleString("pt-BR", {
        timeZone: "UTC",
        dateStyle: "short",
        ...(comHora && { timeStyle: "short" }),
    });
}

// Valor para o atributo datetime de <time>.
export function dataIso(data: Date, comHora = true): string {
    const iso = data.toISOString();
    return comHora ? iso : iso.slice(0, 10);
}

// Resumo em texto puro a partir de markdown (usado quando o conteúdo não tem "descricao").
export function textoSemMarkdown(markdown: string): string {
    return markdown
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // imagens
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links → texto
        .replace(/<[^>]+>/g, "") // HTML
        .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, "") // títulos, citações, listas
        .replace(/(\*\*|__|\*|`)/g, "") // ênfase e código
        .replace(/^-{3,}\s*$/gm, "") // linhas horizontais
        .replace(/\s+/g, " ")
        .trim();
}

export function capitalizar(texto: string): string {
    return texto[0].toUpperCase() + texto.slice(1);
}
