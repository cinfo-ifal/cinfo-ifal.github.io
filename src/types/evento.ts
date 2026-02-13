export type Evento = {
  slug: string;
  data: {
    titulo: string;
    dataInicio: string;
    dataFim: string;
    local: string;
    foto: string;
    tags: string[];
  },
  body: string;
}