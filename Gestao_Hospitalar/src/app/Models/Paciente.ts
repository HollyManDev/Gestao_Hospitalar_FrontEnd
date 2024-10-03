export interface Paciente {
    pacienteID: number;
    nome: string;
    dataNascimento: Date;
    sexo: string;
    endereco: string;
    telefone: string;
    email: string;
    bi: string;
    contatoEmergenciaNome: string;
    contatoEmergenciaTelefone: string;
    contatoEmergenciaRelacao: string;
    historicoMedico: string;
    seguro?: string; // opcional
    status: boolean;
    leito?: number; // opcional
}
