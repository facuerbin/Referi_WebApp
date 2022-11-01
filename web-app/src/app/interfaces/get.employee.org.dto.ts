export interface GetEmployeeOrganization {
  data: PersonalOrganizacion[];
}

export interface PersonalOrganizacion {
  id:                 string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          null;
  organizacion:       Organizacion;
  rol:                Rol;
}

export interface Organizacion {
  id:                 string;
  nombre:             string;
  logo:               string;
  descripcion:        string;
  telefono:           string;
  email:              string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          null;
}

export interface Rol {
  id:                 string;
  nombre:             string;
  descripcion:        string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          null;
}
