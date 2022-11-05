export interface GetPagosByOrganizacion {
  data: Pago[];
}

export interface Pago {
  id:                 string;
  fechaPago:          string;
  numeroComprobante:  null;
  medioDePago:        string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          Date | null;
  cuotas:             Cuota[];
  usuario:            Usuario;
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
  tarifa:             Tarifa;
}

export interface Tarifa {
  id:                 string;
  nombre:             string;
  monto:              number;
  esOpcional:         boolean;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          Date | null;
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
