export function dataParaLocalString(data: string): string {
    return new Date(data).toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    });
}

export function capitalizar(texto: string): string {
    return texto[0].toUpperCase() + texto.slice(1);
}
