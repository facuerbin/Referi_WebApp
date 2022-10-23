export interface GetTipoActividad {
  data: TipoActividad[];
}

export interface TipoActividad {
  id:            string;
  tipo:          string;
  imgUrl:        string;
  fechaCreacion: Date;
  fechaBaja:     null;
}
