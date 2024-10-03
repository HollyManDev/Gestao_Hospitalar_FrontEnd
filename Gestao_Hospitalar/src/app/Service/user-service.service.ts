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

  private apiUrl = `${environment.ApiUrl}`;
  
  constructor(private http: HttpClient) {}

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

  // Métodos de controle de edição e ações
  SetActionRequired(actionreq: string): void {
    this.action = actionreq;
  }
  
  GetActionRequired(): string {
    return this.action;
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
}

