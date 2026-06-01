export interface CreateTurnoDto {
  idActividad:  string;
  idEspacio:    string;
  horarios:     Horario[];
}

export interface Horario {
  dia: string,
  horaInicio: number,
  minutosInicio: number,
  duracion: number,
  espacio: string,
}
