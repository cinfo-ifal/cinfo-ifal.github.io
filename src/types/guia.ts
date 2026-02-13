export type Guia = {
  slug: string;
  data: {
    titulo: string;
    publicadoEm: string;
    modificadoEm: string;
    tags: string[];
    autoria: string;
    foto: string;
    descricao: string;
  },
  body: string;
}