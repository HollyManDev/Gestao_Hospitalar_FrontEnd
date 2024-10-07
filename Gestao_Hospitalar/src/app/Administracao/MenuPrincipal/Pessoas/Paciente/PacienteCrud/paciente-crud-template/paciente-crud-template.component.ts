import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/Models/Paciente';
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente-crud-template',
  templateUrl: './paciente-crud-template.component.html',
  styleUrls: ['./paciente-crud-template.component.scss']
})
export class PacienteCrudTemplateComponent {
  action: string = ''; 
  pacEdition!: Paciente; 
  pacienteForm!: FormGroup; 
  typeButton: string = '';
  pacientes: Paciente[] = [];

  constructor(
    private dialogRef: MatDialogRef<PacienteCrudTemplateComponent>, 
    private userService: UserServiceService, 
    private router: Router) {}

  ngOnInit(): void {
    this.userService.GetPacientes().subscribe(userData => {
      if (userData.data) {
        this.pacientes = userData.data;
      }
    });

    this.action = this.userService.GetActionRequired();
    this.pacEdition = this.userService.GetPacienteEdition();

    if (this.action === 'Edit') {
      this.typeButton = 'Save';
      this.pacienteForm = new FormGroup({
        nome: new FormControl(this.pacEdition.nome, [Validators.required]),
        dataNascimento: new FormControl(this.pacEdition.dataNascimento, [Validators.required]),
        sexo: new FormControl(this.pacEdition.sexo, [Validators.required]),
        endereco: new FormControl(this.pacEdition.endereco, [Validators.required]),
        telefone: new FormControl(this.pacEdition.telefone, [Validators.required]),
        email: new FormControl(this.pacEdition.email, [Validators.required, Validators.email]),
        bi: new FormControl(this.pacEdition.bi, [Validators.required]),
        contatoEmergenciaNome: new FormControl(this.pacEdition.contatoEmergenciaNome, [Validators.required]),
        contatoEmergenciaTelefone: new FormControl(this.pacEdition.contatoEmergenciaTelefone, [Validators.required]),
        contatoEmergenciaRelacao: new FormControl(this.pacEdition.contatoEmergenciaRelacao, [Validators.required]),
        historicoMedico: new FormControl(this.pacEdition.historicoMedico, [Validators.required]),
        seguro: new FormControl(this.pacEdition.seguro),
        leito: new FormControl(this.pacEdition.leito)
      });
    } else {
      if (this.action === 'Add') {
        this.typeButton = 'Add';
        this.initializing();
      }
    }  
  }

  initializing(): void {
    this.pacienteForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      endereco: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      bi: new FormControl('', [Validators.required]),
      contatoEmergenciaNome: new FormControl('', [Validators.required]),
      contatoEmergenciaTelefone: new FormControl('', [Validators.required]),
      contatoEmergenciaRelacao: new FormControl('', [Validators.required]),
      historicoMedico: new FormControl('', [Validators.required]),
      seguro: new FormControl(''),
      leito: new FormControl('')
    });
  }

  submit() {
    if (this.pacienteForm.valid) {
      const pacData: Paciente = this.pacienteForm.value;
      pacData.status = true;

      if (this.action === 'Edit' && this.typeButton === 'Save') {
        pacData.pacienteID = this.pacEdition.pacienteID;
        this.userService.UpdatePaciente(pacData).subscribe(
          (response) => {
            this.showSuccessMessage1();
            location.reload();
          },
          (error) => {
            console.error('Erro ao atualizar Paciente:', error);
          }
        );
      } else if (this.action === 'Add' && this.typeButton === 'Add') {
        let exist = this.pacientes.find(pac => pacData.nome.trim() === pac.nome.trim());
        if (!exist) {
          this.userService.CreatePaciente(pacData).subscribe(
            (response) => {
              this.showSuccessMessage();
              location.reload();
            },
            (error) => {
              console.error('Erro ao criar Paciente:', error);
            }
          );
        } else {
          this.showErrorExistMessage();
        }
      }
    } else {
      this.showErrorMessage('Please fill out all required fields.');
      this.pacienteForm.markAllAsTouched();
    }
  }

  Close(): void { 
    this.dialogRef.close('true');
  }

  showSuccessMessage() {
    Swal.fire({
      icon: 'success',
      title: 'Paciente salvo com sucesso!',
      showConfirmButton: false,
      timer: 3000
    });
  }

  showSuccessMessage1() {
    Swal.fire({
      icon: 'success',
      title: 'Paciente atualizado com sucesso!',
      showConfirmButton: false,
      timer: 3000
    });
  }

  showErrorExistMessage() {
    Swal.fire({
      icon: 'error',
      title: 'Paciente já existe!',
      showConfirmButton: false,
      timer: 2000
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
