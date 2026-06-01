export interface ListRoles {
  data: Rol[];
}

export interface Rol {
  id:                 string;
  nombre:             string;
  descripcion:        string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          null;
  permisos:           Permiso[];
}

export interface Permiso {
  id:                 string;
  modulo:             string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          null;
}
