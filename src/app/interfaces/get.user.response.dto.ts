export interface GetUserResponseDto {
  data: User;
}

export interface User {
  id:                 string;
  email:              string;
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
