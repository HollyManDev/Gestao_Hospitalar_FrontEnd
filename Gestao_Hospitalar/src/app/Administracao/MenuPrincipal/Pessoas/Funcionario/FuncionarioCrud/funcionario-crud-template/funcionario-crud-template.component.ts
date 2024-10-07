import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
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

  constructor(
    private dialogRef: MatDialogRef<FuncCrudTemplateComponent>,
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.GetFuncionarios().subscribe(userData => {
      if (userData.data) {
        this.funcionarios = userData.data;
      }
    });

    this.action = this.userService.GetActionRequired();
    this.funcEdition = this.userService.GetFuncionarioEdition();

    if (this.action === 'Edit') {
      this.typeButton = 'Save';
      this.funcionarioForm = new FormGroup({
        funcionarioID: new FormControl(this.funcEdition.funcionarioID, [Validators.required]),
        nome: new FormControl(this.funcEdition.nome, [Validators.required]),
        cargo: new FormControl(this.funcEdition.cargo, [Validators.required]),
        telefone: new FormControl(this.funcEdition.telefone, [Validators.required]),
        email: new FormControl(this.funcEdition.email, [Validators.required, Validators.email]),
        endereco: new FormControl(this.funcEdition.endereco, [Validators.required]),
        dataContratacao: new FormControl(this.funcEdition.dataContratacao, [Validators.required]),
        status: new FormControl(this.funcEdition.status),
        departamentoID: new FormControl(this.funcEdition.departamentoID, [Validators.required]),
        cargoID: new FormControl(this.funcEdition.cargoID, [Validators.required]),
      });
    } else if (this.action === 'Add') {
      this.typeButton = 'Add';
      this.initializing();
    }  
  }

  initializing(): void {
    this.funcionarioForm = new FormGroup({
      funcionarioID: new FormControl({ value: null, disabled: true }),
      nome: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      endereco: new FormControl('', [Validators.required]),
      dataContratacao: new FormControl(new Date(), [Validators.required]),
      status: new FormControl(true),
      departamentoID: new FormControl(null, [Validators.required]),
      cargoID: new FormControl(null, [Validators.required]),
    });
  }

  submit() {
    if (this.funcionarioForm.valid) {
      const funcData: Funcionario = this.funcionarioForm.value;
      funcData.status = true;

      if (this.action === 'Edit' && this.typeButton === 'Save') {
        // Passando o id do Funcionario para atualizar
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
