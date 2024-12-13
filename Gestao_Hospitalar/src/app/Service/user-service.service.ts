import { Response } from './../Models/ServerResponse/ServerResponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { Departamento } from '../Models/Departamento';
import { Especialidade } from '../Models/Especialidade';
import { Fornecedor } from '../Models/Fornecedor';
import { Leito } from '../Models/Leito'; 
import { Cama } from '../Models/Cama';
import { Medico } from '../Models/Medico';
import { Medicamento } from '../Models/Medicamento'; // Adicione a importação do modelo Medicamento
import { Equipamento } from '../Models/EquipamentoMedico';
import { Cargo } from '../Models/Cargo';
import { Paciente } from '../Models/Paciente';
import { Funcionario } from '../Models/Funcionario';
import { Outros } from '../Models/Outros';
import { Agendamento } from '../Models/Agendamento';
import { Consulta } from '../Models/Consulta';
import { User } from '../Models/User';
import { Produto } from '../Models/Produto';

@Injectable({  
  providedIn: 'root'
}) 
export class UserServiceService {

  private idUSER: number = 0;
  private action: string = '';
  private type: string = '';
  private dep!: Departamento;
  private esp!: Especialidade;
  private forn!: Fornecedor;
  private leito!: Leito;
  private cama!: Cama;
  private medico!: Medico;
  private medicamento!: Medicamento;
  private equipamento!: Equipamento;
  private cargo!: Cargo;
  private paciente!: Paciente;
  private funcionario!: Funcionario;
  private agendamento!: Agendamento;
  private consulta!: Consulta
  private outro!: Outros;
  private produto!:Produto;

  private apiUrl = `${environment.ApiUrl}`;
  
  constructor(private http: HttpClient) {}

  //Login
  AuthenticateUser(userCredentials: User): Observable<Response<User>> {

   
    return this.http.post<Response<User>>(`${this.apiUrl}login`, userCredentials);
    
  }

  // Métodos para Departamentos
  GetDepartamentos() : Observable<Response<Departamento[]>> {
    return this.http.get<Response<Departamento[]>>(`${this.apiUrl}Departamento`);
  }
   
  CreateDepartment(department: Departamento) : Observable<Response<Departamento[]>> {
    return this.http.post<Response<Departamento[]>>(`${this.apiUrl}Departamento`, department);
  }

  UpdateDepartamento(departamento: Departamento) : Observable<Response<Departamento[]>> {
    return this.http.put<Response<Departamento[]>>(`${this.apiUrl}Departamento`, departamento);
  }

  DeleteDepartamento(department: Departamento) : Observable<Response<Departamento[]>> {
    return this.http.put<Response<Departamento[]>>(`${this.apiUrl}Departamento/Inactivate`, department);
  }

  // Métodos para Especialidades
  GetEspecialidades() : Observable<Response<Especialidade[]>> {
    return this.http.get<Response<Especialidade[]>>(`${this.apiUrl}Especialidade`);
  }

  CreateEspecialidade(especialidade: Especialidade) : Observable<Response<Especialidade[]>> {
    return this.http.post<Response<Especialidade[]>>(`${this.apiUrl}Especialidade`, especialidade);
  }

  UpdateEspecialidade(especialidade: Especialidade) : Observable<Response<Especialidade[]>> {
    return this.http.put<Response<Especialidade[]>>(`${this.apiUrl}Especialidade`, especialidade);
  }

  DeleteEspecialidade(especialidade: Especialidade) : Observable<Response<Especialidade[]>> {
    return this.http.put<Response<Especialidade[]>>(`${this.apiUrl}Especialidade/Delete`, especialidade);
  }

  // Métodos para Fornecedores
  GetFornecedores() : Observable<Response<Fornecedor[]>> {
    return this.http.get<Response<Fornecedor[]>>(`${this.apiUrl}Fornecedor`);
  }

  CreateFornecedor(fornecedor: Fornecedor) : Observable<Response<Fornecedor[]>> {
    return this.http.post<Response<Fornecedor[]>>(`${this.apiUrl}Fornecedor`, fornecedor);
  }

  UpdateFornecedor(fornecedor: Fornecedor) : Observable<Response<Fornecedor[]>> {
    return this.http.put<Response<Fornecedor[]>>(`${this.apiUrl}Fornecedor`, fornecedor);
  }

  DeleteFornecedor(fornecedor: Fornecedor) : Observable<Response<Fornecedor[]>> {
    return this.http.put<Response<Fornecedor[]>>(`${this.apiUrl}Fornecedor/Inactivate`, fornecedor);
  }

  // Métodos para Leitos
  GetLeitos() : Observable<Response<Leito[]>> {
    return this.http.get<Response<Leito[]>>(`${this.apiUrl}Leito`);
  }

  CreateLeito(leito: Leito) : Observable<Response<Leito[]>> {
    return this.http.post<Response<Leito[]>>(`${this.apiUrl}Leito`, leito);
  }

  UpdateLeito(leito: Leito) : Observable<Response<Leito[]>> {
    return this.http.put<Response<Leito[]>>(`${this.apiUrl}Leito`, leito);
  }

  DeleteLeito(leito: Leito) : Observable<Response<Leito[]>> {
    return this.http.put<Response<Leito[]>>(`${this.apiUrl}Leito/Inactivate`, leito);
  }

  // Métodos para Camas
  GetCamas() : Observable<Response<Cama[]>> {
    return this.http.get<Response<Cama[]>>(`${this.apiUrl}Cama`);
  }

  CreateCama(cama: Cama) : Observable<Response<Cama[]>> {
    return this.http.post<Response<Cama[]>>(`${this.apiUrl}Cama`, cama);
  }

  UpdateCama(cama: Cama) : Observable<Response<Cama[]>> {
    return this.http.put<Response<Cama[]>>(`${this.apiUrl}Cama`, cama);
  }

  DeleteCama(cama: Cama) : Observable<Response<Cama[]>> {
    return this.http.put<Response<Cama[]>>(`${this.apiUrl}Cama/Inactivate`, cama);
  }

  // Métodos para Médicos
  GetMedicos() : Observable<Response<Medico[]>> {
    return this.http.get<Response<Medico[]>>(`${this.apiUrl}Medico`);
  }

  CreateMedico(medico: Medico) : Observable<Response<Medico[]>> {
    return this.http.post<Response<Medico[]>>(`${this.apiUrl}Medico`, medico);
  }

  UpdateMedico(medico: Medico) : Observable<Response<Medico[]>> {
    return this.http.put<Response<Medico[]>>(`${this.apiUrl}Medico`, medico);
  }

  DeleteMedico(medico: Medico) : Observable<Response<Medico[]>> {
    return this.http.put<Response<Medico[]>>(`${this.apiUrl}Medico/Inactivate`, medico);
  }

  // Métodos para Medicamentos
  GetMedicamentos() : Observable<Response<Medicamento[]>> {
    return this.http.get<Response<Medicamento[]>>(`${this.apiUrl}InventarioMedicamento`);
  }

  CreateMedicamento(medicamento: Medicamento) : Observable<Response<Medicamento[]>> {
    return this.http.post<Response<Medicamento[]>>(`${this.apiUrl}InventarioMedicamento`, medicamento);
  }

  UpdateMedicamento(medicamento: Medicamento) : Observable<Response<Medicamento[]>> {
    return this.http.put<Response<Medicamento[]>>(`${this.apiUrl}InventarioMedicamento`, medicamento);
  }

  DeleteMedicamento(medicamento: Medicamento) : Observable<Response<Medicamento[]>> {
    return this.http.put<Response<Medicamento[]>>(`${this.apiUrl}InventarioMedicamento/Inactivate`, medicamento);
  }

   // Métodos para Equipamentos
   GetEquipamentos(): Observable<Response<Equipamento[]>> {
    return this.http.get<Response<Equipamento[]>>(`${this.apiUrl}EquipamentoMedico`);
  }

  CreateEquipamento(equipamento: Equipamento): Observable<Response<Equipamento[]>> {
    return this.http.post<Response<Equipamento[]>>(`${this.apiUrl}EquipamentoMedico`, equipamento);
  }

  UpdateEquipamento(equipamento: Equipamento): Observable<Response<Equipamento[]>> {
    return this.http.put<Response<Equipamento[]>>(`${this.apiUrl}EquipamentoMedico`, equipamento);
  }

  DeleteEquipamento(equipamento: Equipamento): Observable<Response<Equipamento[]>> {
    return this.http.put<Response<Equipamento[]>>(`${this.apiUrl}EquipamentoMedico/Inactivate`, equipamento);
  }

  
  // Métodos para Cargos
  GetCargos() : Observable<Response<Cargo[]>> {
    return this.http.get<Response<Cargo[]>>(`${this.apiUrl}Cargo`);
  }

  CreateCargo(cargo: Cargo) : Observable<Response<Cargo[]>> {
   
    return this.http.post<Response<Cargo[]>>(`${this.apiUrl}Cargo`, cargo);
  }

  UpdateCargo(cargo: Cargo) : Observable<Response<Cargo[]>> {
    return this.http.put<Response<Cargo[]>>(`${this.apiUrl}Cargo`, cargo);
  }

  DeleteCargo(cargo: Cargo) : Observable<Response<Cargo[]>> {
    return this.http.put<Response<Cargo[]>>(`${this.apiUrl}Cargo/Inactivate`, cargo);
  }

   // Métodos para Pacientes
   GetPacientes() : Observable<Response<Paciente[]>> {
    return this.http.get<Response<Paciente[]>>(`${this.apiUrl}Paciente`);
  }

  CreatePaciente(paciente: Paciente) : Observable<Response<Paciente[]>> {
    console.log(paciente)
    return this.http.post<Response<Paciente[]>>(`${this.apiUrl}Paciente`, paciente);
  }

  UpdatePaciente(paciente: Paciente) : Observable<Response<Paciente[]>> {
    return this.http.put<Response<Paciente[]>>(`${this.apiUrl}Paciente`, paciente);
  }

  DeletePaciente(paciente: Paciente) : Observable<Response<Paciente[]>> {
    return this.http.put<Response<Paciente[]>>(`${this.apiUrl}Paciente/Inactivate`, paciente);
  }
  
   //Metodos para Funcionario 
   GetFuncionarios() : Observable<Response<Funcionario[]>> {
    return this.http.get<Response<Funcionario[]>>(`${this.apiUrl}Funcionario`);
  }
  CreateFuncionario(paciente: Funcionario) : Observable<Response<Funcionario[]>> {
    return this.http.post<Response<Funcionario[]>>(`${this.apiUrl}Funcionario`, paciente);
  }

  UpdateFuncionario(paciente: Funcionario) : Observable<Response<Funcionario[]>> {
    return this.http.put<Response<Funcionario[]>>(`${this.apiUrl}Funcionario`, paciente);
  }

  DeleteFuncionario(paciente: Funcionario) : Observable<Response<Funcionario[]>> {
    return this.http.put<Response<Funcionario[]>>(`${this.apiUrl}Funcionario/Inactivate`, paciente);
  }

   //Metodos para Outros
   GetOutros() : Observable<Response<Outros[]>> {
    return this.http.get<Response<Outros[]>>(`${this.apiUrl}Outro`);
  }
  CreateOutro(paciente: Outros) : Observable<Response<Outros[]>> {
    return this.http.post<Response<Outros[]>>(`${this.apiUrl}Outro`, paciente);
  }

  UpdateOutro(paciente:Outros) : Observable<Response<Outros[]>> {
    return this.http.put<Response<Outros[]>>(`${this.apiUrl}Outro`, paciente);
  }

  DeleteOutro(paciente: Outros) : Observable<Response<Outros[]>> {
    return this.http.put<Response<Outros[]>>(`${this.apiUrl}Outro/Inactivate`, paciente);
  }

  // Métodos para Agendamento
  GetAgendamento() : Observable<Response<Agendamento[]>> {
    return this.http.get<Response<Agendamento[]>>(`${this.apiUrl}Agendamento`);
  }

  CreateAgendamento(medico: Agendamento) : Observable<Response<Agendamento[]>> {
    return this.http.post<Response<Agendamento[]>>(`${this.apiUrl}Agendamento`, medico);
  }

  UpdateAgendamento(medico: Agendamento) : Observable<Response<Agendamento[]>> {

    return this.http.put<Response<Agendamento[]>>(`${this.apiUrl}Agendamento`, medico);
  }

  DeleteAgendamento(medico:Agendamento) : Observable<Response<Agendamento[]>> {
    return this.http.put<Response<Agendamento[]>>(`${this.apiUrl}Agendamento/Inactivate`, medico);
  }
  GetAgendamentosByMedico(medicoId: number): Observable<Response<Agendamento[]>> {
    
    return this.http.get<Response<Agendamento[]>>(`${this.apiUrl}Agendamento/ByMedico/${medicoId}`);
  }
  

  // Métodos para Consulta
  GetConsulta() : Observable<Response<Consulta[]>> {
    return this.http.get<Response<Consulta[]>>(`${this.apiUrl}Consulta`);
  }

  CreateConsulta(medico: Consulta) : Observable<Response<Consulta[]>> {
    return this.http.post<Response<Consulta[]>>(`${this.apiUrl}Consulta`, medico);
  }

  UpdateConsulta(medico:Consulta) : Observable<Response<Consulta[]>> {
    return this.http.put<Response<Consulta[]>>(`${this.apiUrl}Consulta`, medico);
  }

  DeleteConsulta(medico:Consulta) : Observable<Response<Consulta[]>> {
    return this.http.put<Response<Consulta[]>>(`${this.apiUrl}Consulta/Inactivate`, medico);
  }
  GetConsultasByMedico(medicoId: number): Observable<Response<Consulta[]>> {
    
    return this.http.get<Response<Consulta[]>>(`${this.apiUrl}Consulta/ByMedico/${medicoId}`);
  }


  // Métodos para Produto
GetProdutos() : Observable<Response<Produto[]>> {
  return this.http.get<Response<Produto[]>>(`${this.apiUrl}Produto`);
}

CreateProduto(produto: Produto) : Observable<Response<Produto[]>> {
  return this.http.post<Response<Produto[]>>(`${this.apiUrl}Produto`, produto);
}

UpdateProduto(produto: Produto) : Observable<Response<Produto[]>> {
  return this.http.put<Response<Produto[]>>(`${this.apiUrl}Produto`, produto);
}

DeleteProduto(produto: Produto) : Observable<Response<Produto[]>> {
  return this.http.put<Response<Produto[]>>(`${this.apiUrl}Produto/Inactivate`, produto);
}

  // Métodos de controle de edição e ações
  SetActionRequired(actionreq: string): void {
    this.action = actionreq;
  }
  
  GetActionRequired(): string {
    return this.action;
  }
  SetUserAuthenticated(iduser: number): void {
    this.idUSER = iduser;
  }
  
  GetUserAuthenticated(): number{
    return this.idUSER;
  }

  SetDepartmentEdition(depEdition: Departamento): void {
    this.dep = depEdition;
  }
  
  GetDepartmentEdition(): Departamento {
    return this.dep;
  }

  SetEspecialidadeEdition(espEdition: Especialidade): void {
    this.esp = espEdition;
  }
  
  GetEspecialidadeEdition(): Especialidade {
    return this.esp;
  }

  SetFornecedorEdition(forn: Fornecedor): void {
    this.forn = forn;
  }
  
  GetFornecedorEdition(): Fornecedor {
    return this.forn;
  }

  // Métodos para Leito
  SetLeitoEdition(leitoEdition: Leito): void {
    this.leito = leitoEdition;
  }
  
  GetLeitoEdition(): Leito {
    return this.leito;
  }

  // Métodos para Cama
  SetCamaEdition(camaEdition: Cama): void {
    this.cama = camaEdition;
  }
  
  GetCamaEdition(): Cama {
    return this.cama;
  }

  // Métodos para Médico
  SetMedicoEdition(medicoEdition: Medico): void {
    this.medico = medicoEdition;
  }
  
  GetMedicoEdition(): Medico {
    return this.medico;
  }

  // Métodos para Medicamento
  SetMedicamentoEdition(medicamentoEdition: Medicamento): void {
    this.medicamento = medicamentoEdition;
  }

  GetMedicamentoEdition(): Medicamento {
    return this.medicamento;
  }

  // Métodos para controle de edição e ações para Equipamento
  SetEquipamentoEdition(equipamentoEdition: Equipamento): void {
    this.equipamento = equipamentoEdition;
  }

  GetEquipamentoEdition(): Equipamento {
    return this.equipamento;
  }

   // Métodos para Cargo
   SetCargoEdition(cargoEdition: Cargo): void {
    this.cargo = cargoEdition;
  }
  
  GetCargoEdition(): Cargo {
    return this.cargo;
  }
  
  // Métodos para Paciente
  SetPacienteEdition(cargoEdition: Paciente): void {
    this.paciente = cargoEdition;
  }
  
  GetPacienteEdition(): Paciente {
    return this.paciente;
  }
   // Métodos para Paciente
   SetFuncionarioEdition(funEdition: Funcionario): void {
    this.funcionario = funEdition;
  }
  
  GetFuncionarioEdition(): Funcionario{
    return this.funcionario;
  }
    // Métodos para Outros
    SetOutroEdition(outroEdition: Outros): void {
      this.outro = outroEdition;
    }
    
    GetOutroEdition(): Outros{
      return this.outro;
    }

    SetAgendamentoEdition(depEdition: Agendamento): void {
      this.agendamento = depEdition;
    }
    
    GetAgendamentoEdition(): Agendamento{
      return this.agendamento;
    }
    
    SetConsultaEdition(depEdition: Consulta): void {
      this.consulta = depEdition;
    }
    
    GetConsultaEdition(): Consulta{
      return this.consulta;
    }
    SetProdutoEdition(depEdition: Produto): void {
      this.produto = depEdition;
    }
    
    GetProdutoEdition(): Produto{
      return this.produto;
    }

}

