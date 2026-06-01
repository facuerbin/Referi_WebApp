export interface InscribirSocioDto {
  email:            string;
  nombre:           string;
  apellido:         string;
  dni:              number;
  telefono:         string;
  fechaNacimiento:  Date;
  domicilio:        Domicilio;
  idTurnoActividad: string;
}

export interface Domicilio {
  calle:     string;
  numero:    number;
  ciudad:    string;
  provincia: string;
}
