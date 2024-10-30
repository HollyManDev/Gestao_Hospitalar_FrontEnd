export interface Funcionario {
     funcionarioID: number;
     nome: string;
     genero: string;
     cargo: string;
     telefones: string[];  // Alterar para um array de strings
     email: string;
     endereco: string;
     dataContratacao: Date;
     status: boolean;
     departamentoID: number;
     cargoID: number;
   }
   