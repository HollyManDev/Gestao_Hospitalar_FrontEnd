export interface Consulta {
    consultaID: number;
    pacienteID: number;
    medicoID: number;
    dataHora: Date;
    motivo: string;
    observacoes: string;
    status: string;
    diagnostico: string;
    tratamentoRecomendado: string;
  }
  