export interface SendNotificationResponse {
  titulo:           string;
  cuerpo:           string;
  fecha:            Date;
  idRemitente:      string;
  nombreRemitente:  string;
  tipoRemitente:    string;
  tipoDestinatario: string;
  usuarios:         Usuario[];
  id:               string;
}

export interface Usuario {
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
