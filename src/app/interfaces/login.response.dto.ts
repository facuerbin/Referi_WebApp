export interface LoginResponseDto {
  data: Data;
}

export interface Data {
  user:         User;
  access_token: string;
}

export interface User {
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
  fechaBaja:          Date | null;
}
