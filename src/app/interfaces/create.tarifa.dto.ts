export interface CreateTarifaDto {
  nombre:           string;
  monto:            number;
  esOpcional:       boolean;
  nombreFrecuencia: string;
  idOrganizacion:   string;
  idActividad:  string;
}
