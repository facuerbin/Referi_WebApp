export interface GetCuotasInscripto {
  data: Cuota[];
}

export interface Cuota {
  id:                 string;
  monto:              number;
  periodoInicio:      Date;
  periodoFin:         Date;
  fechaVencimiento:   Date;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          null;
  tarifa:             Tarifa;
  pago:               Pago | null;
  inscripcion:        Inscripcion;
}

export interface Inscripcion {
  id:                 string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          null;
  usuario:            Usuario;
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
  fechaBaja:          null;
}

export interface Pago {
  id:                 string;
  fechaPago:          Date;
  numeroComprobante:  null;
  medioDePago:        string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          null;
}

export interface Tarifa {
  id:                 string;
  nombre:             string;
  monto:              number;
  esOpcional:         boolean;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          null;
  actividad:          Actividad;
}

export interface Actividad {
  id:                 string;
  nombre:             string;
  descripcion:        string;
  cupo:               number;
  imgUrl:             string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          null;
}
