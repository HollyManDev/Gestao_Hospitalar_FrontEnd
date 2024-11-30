export interface Agendamento {
    agendamentoID: number; // Identificador único do agendamento
    pacienteID: number; // Identificador do paciente
    medicoID: number; // Identificador do médico
    dataHora: Date; // Data e hora do agendamento
    tipoAgendamento: string; // Tipo do agendamento (ex.: Consulta, Exame)
    status: string; // Status do agendamento (ex.: Agendado, Cancelado)
    observacoes: string; // Observações adicionais
   
  }
  