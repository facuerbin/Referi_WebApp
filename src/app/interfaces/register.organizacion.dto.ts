import { Domicilio } from "./domicilio";

export interface RegisterDto {
  "Organization": {
    "nombre": string,
    "direccion": Domicilio,
    "tipoOrganizacion": string,
    "logo": string,
    "descripcion": string,
    "telefono": string,
    "email": string
  },
  "User": {
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
}
