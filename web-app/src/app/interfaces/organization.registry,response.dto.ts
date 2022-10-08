import { Domicilio } from "./domicilio";

export interface RegisterOrganizationResponseDto {
  "nombre": string,
  "direccion": Domicilio,
  "tipoOrganizacion": string,
  "logo": string,
  "descripcion": string,
  "telefono": string,
  "email": string
}
