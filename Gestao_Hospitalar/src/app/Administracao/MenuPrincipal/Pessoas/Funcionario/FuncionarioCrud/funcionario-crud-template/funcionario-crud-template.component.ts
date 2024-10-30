import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cargo } from 'src/app/Models/Cargo';
import { Departamento } from 'src/app/Models/Departamento';
import { Funcionario } from 'src/app/Models/Funcionario';
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-func-crud-template',
  templateUrl: './funcionario-crud-template.component.html',
  styleUrls: ['./funcionario-crud-template.component.scss']
})
export class FuncCrudTemplateComponent implements OnInit {
  action: string = '';
  funcEdition!: Funcionario;
  funcionarioForm!: FormGroup;
  typeButton: string = '';
  funcionarios: Funcionario[] = [];
  cargos: Cargo[] = [];
  departamentos: Departamento[] = [];
  cargoId: number = 0;
  deptId: number = 0;

  constructor(
    private dialogRef: MatDialogRef<FuncCrudTemplateComponent>,
    private userService: UserServiceService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.GetCargos();
    this.GetDepartamentos();

    this.userService.GetFuncionarios().subscribe(userData => {
      if (userData.data) {
        this.funcionarios = userData.data;
      }
    });
   
    this.action = this.userService.GetActionRequired();
    this.funcEdition = this.userService.GetFuncionarioEdition();

    if (this.action === 'Edit') {
      this.typeButton = 'Save';
      this.funcionarioForm = this.fb.group({
        funcionarioID: [this.funcEdition.funcionarioID, [Validators.required]],
        nome: [this.funcEdition.nome, [Validators.required]],
        departamento: [(this.getDepartamentoName(this.funcEdition.departamentoID)), [Validators.required]],
        cargo: [(this.getCargoName(this.funcEdition?.cargoID)), [Validators.required]],
        genero: [this.funcEdition.genero, [Validators.required]],
        telefones: this.fb.array([]), // FormArray para múltiplos telefones
        email: [this.funcEdition.email, [Validators.required, Validators.email]],
        endereco: [this.funcEdition.endereco, [Validators.required]],
        dataContratacao: [this.funcEdition.dataContratacao, [Validators.required]],
       
       
      });

      // Inicializar os telefones existentes, se houver
      if (this.funcEdition.telefones && this.funcEdition.telefones.length > 0) {
        this.funcEdition.telefones.forEach(telefone => {
          this.addTelefone(telefone);
        });
      } else {
        // Se não houver telefones, inicializa com um telefone vazio
        this.addTelefone();
      }
    } else if (this.action === 'Add') {
      this.typeButton = 'Add';
      this.initializing();
    }
  }

  initializing(): void {
    this.funcionarioForm = this.fb.group({
      nome: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      telefones: this.fb.array([this.novoTelefone()]), // Inicializa com um telefone
      email: ['', [Validators.required, Validators.email]],
      endereco: ['', [Validators.required]],
      dataContratacao: ['', [Validators.required]],
     
    });
  }

  get telefonesFormArray(): FormArray {
    return this.funcionarioForm.get('telefones') as FormArray;
  }

  novoTelefone(telefone?: string): FormGroup {
    return this.fb.group({
      telefone: [telefone || '', [Validators.required]]
    });
  }

  GetCargos(): void {
    this.userService.GetCargos().subscribe(userData => {
      if (userData.data) {
        this.cargos = userData.data;
        if (this.funcEdition?.cargoID) {
          this.funcionarioForm.controls['cargo'].setValue(this.getCargoName(this.funcEdition.cargoID));
        }
      }
    });
  }
  GetDepartamentos(): void {
    this.userService.GetDepartamentos().subscribe(userData => {
      if (userData.data) {
        this.departamentos = userData.data;
        if (this.funcEdition?.departamentoID) {
          this.funcionarioForm.controls['departamento'].setValue(this.getDepartamentoName(this.funcEdition.departamentoID));
        }
      }
    });
  }

  getCargoId(cargo: Cargo): void {
    this.cargoId = cargo.cargoID;
  }

  getCargoName(cargoId: number): string {
    const cargo = this.cargos.find(l => l.cargoID === cargoId);
    return cargo ? cargo.descricao : 'Sem Cargo';
  }
  getDepartamentoId(dept: Departamento): void {
    this.deptId = dept.departamentoID;
  }

  getDepartamentoName(deptId: number): string {
    const dept = this.departamentos.find(l => l.departamentoID === deptId);
    return dept ? dept.nome : 'Sem Departamento';
  }

  addTelefone(telefone?: string): void {
    this.telefonesFormArray.push(this.novoTelefone(telefone));
  }

  removerTelefone(index: number): void {
    this.telefonesFormArray.removeAt(index);
  }

  submit(): void {
    if (this.funcionarioForm.valid) {
      // Transformar o array de objetos para um array de strings
      const telefonesArray: string[] = this.telefonesFormArray.value.map((tel: { telefone: string }) => tel.telefone);

      const funcData: Funcionario = {
        ...this.funcionarioForm.value,
        telefones: telefonesArray, // Substituir o campo telefones com array de strings
        status: true,
        cargoID: this.cargoId || this.funcEdition?.cargoID || 0,
        departamentoID: this.deptId || this.funcEdition?.departamentoID || 0
      };

      if (this.action === 'Edit' && this.typeButton === 'Save') {
        funcData.funcionarioID = this.funcEdition.funcionarioID;

        this.userService.UpdateFuncionario(funcData).subscribe(
          (response) => {
            this.showSuccessMessage('Funcionário atualizado com sucesso!');
            location.reload();
          },
          (error) => {
            console.error('Erro ao atualizar funcionário:', error);
          }
        );
      } else if (this.action === 'Add' && this.typeButton === 'Add') {
       
        this.userService.CreateFuncionario(funcData).subscribe(
          (response) => {
            this.showSuccessMessage('Funcionário adicionado com sucesso!');
            location.reload();
          },
          (error) => {
            console.error('Erro ao criar funcionário:', error);
          }
        );
      }
    } else {
      this.showErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      this.funcionarioForm.markAllAsTouched();
    }
  }

  Close(): void {
    this.dialogRef.close('true');
  }

  showSuccessMessage(message: string) {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 3000
    });
  }

  showErrorMessage(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: message,
      showConfirmButton: false,
      timer: 3000
    });
  }
}
