import { ContatoEmergencia } from "./ContatoEmergencia";

export interface Paciente {
    pacienteID: number;
    nome: string;
    dataNascimento: Date;
    sexo: string;
    endereco: string;
    telefone: string;
    email: string;
    bi: string;
    contatosEmergencia: ContatoEmergencia[];
    historicoMedico: string;
    seguro?: string; // opcional
    status: boolean;
    leito?: number; // opcional
}
