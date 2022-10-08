import { Domicilio } from "./domicilio";

export interface User {
  "email": string,
  "nombre": string,
  "apellido": string,
  "dni": number,
  "telefono": string,
  "fechaNacimiento": Date,
  "fotoPerfil": string,
  "domicilio": Domicilio,
  "access_token": string,
}
