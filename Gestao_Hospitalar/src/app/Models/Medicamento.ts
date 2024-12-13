export interface Medicamento {
    medicamentoID: number;
    quantidade: number;
    dataEmissao: Date;
    dataValidade: Date;
    lote: string;
    centroDeCusto: string;
    produto: string;
    fornecedorID: number;
    status: Boolean;
}
