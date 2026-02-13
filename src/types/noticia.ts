export type Noticia = {
  slug: string;              
  data: {
    titulo: string;
    descricao: string;
    foto: string;
    publicadoEm: string;
    modificadoEm: string;
    autoria: string[];
  }
}