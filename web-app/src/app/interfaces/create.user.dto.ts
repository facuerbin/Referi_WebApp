import { Domicilio } from "./domicilio";

export interface CreateUserDto {
  "email": string,
  "password": string,
  "nombre": string,
  "apellido": string,
  "dni": number,
  "telefono": string,
  "fechaNacimiento": string,
  "fotoPerfil": string,
  "domicilio": Domicilio
}
