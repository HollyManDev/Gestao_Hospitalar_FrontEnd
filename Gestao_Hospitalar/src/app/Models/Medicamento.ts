export interface Medicamento {
    medicamentoID: number;
    nome: string;
    quantidade: number;
    dataValidade: Date; 
    fornecedorID: number;
    status: Boolean;
}
