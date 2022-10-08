import { Domicilio } from "./domicilio";

export interface CreateOrganizationDto {
  "nombre": string,
  "direccion": Domicilio,
  "tipoOrganizacion": string,
  "logo": string,
  "descripcion": string,
  "telefono": string,
  "email": string
}
