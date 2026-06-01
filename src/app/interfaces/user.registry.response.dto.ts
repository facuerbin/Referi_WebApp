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
  verificado: boolean,
  fechaBaja: Date | null,
  id: string,
  fechaCreacion: Date,
  fechaActualizacion: Date,
  access_token: string
}
