export interface CreateEmployeeResponse {
  data: PersonalOrganizacion;
}

export interface PersonalOrganizacion {
  personal:           Personal;
  organizacion:       null;
  rol:                null;
  fechaBaja:          null;
  id:                 string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
}

export interface Personal {
  id:                 string;
  email:              string;
  password:           string;
  nombre:             string;
  apellido:           string;
  dni:                number;
  telefono:           string;
  verificado:         boolean;
  fechaNacimiento:    Date;
  fotoPerfil:         string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          null;
  domicilio:          Domicilio;
}

export interface Domicilio {
  id:        string;
  calle:     string;
  numero:    number;
  ciudad:    string;
  provincia: string;
}
