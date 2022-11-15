export interface CreatePagoResponseDto {
  fechaPago:          Date;
  numeroComprobante:  null;
  medioDePago:        string;
  usuario:            Usuario;
  organizacion:       Organizacion;
  cuotas:             Cuota[];
  fechaBaja:          Date | null;
  id:                 string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
}

export interface Cuota {
  id:                 string;
  monto:              number;
  periodoInicio:      Date;
  periodoFin:         Date;
  fechaVencimiento:   Date;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          Date | null;
  inscripcion:        Inscripcion;
}

export interface Inscripcion {
  id:                 string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          Date | null;
  usuario:            Usuario;
  organizacion:       Organizacion;
}

export interface Organizacion {
  id:                 string;
  nombre:             string;
  logo:               string;
  descripcion:        string;
  telefono:           string;
  email:              string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          Date | null;
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
