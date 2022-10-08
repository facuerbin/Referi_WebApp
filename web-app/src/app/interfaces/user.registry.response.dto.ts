import { Domicilio } from "./domicilio";

export interface RegisterUserResponseDto {
  nombre: string,
  apellido: string,
  email: string,
  password: string,
  dni: number,
  telefono: string,
  fechaNacimiento: Date,
  fotoPerfil: string,
  domicilio: Domicilio,
  fechaBaja: Date,
  id: string,
  fechaCreacion: Date,
  fechaActualizacion: Date,
  access_token: string
}
