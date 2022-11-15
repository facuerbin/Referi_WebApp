export interface CreatePagoDto {
  medioDePago:         string;
  numeroDeComprobante?: string;
  idsCuota:            string[];
}
