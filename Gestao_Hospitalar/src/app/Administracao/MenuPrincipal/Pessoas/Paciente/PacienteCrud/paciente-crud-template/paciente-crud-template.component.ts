import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Paciente } from 'src/app/Models/Paciente';
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente-crud-template',
  templateUrl: './paciente-crud-template.component.html',
  styleUrls: ['./paciente-crud-template.component.scss']
})
export class PacienteCrudTemplateComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

//   pacienteForm!: FormGroup;
//   action: string = '';
//   pacienteEdition!: Paciente;

//   constructor(
//     private dialogRef: MatDialogRef<PacienteCrudTemplateComponent>,
//     private userService: UserServiceService
//   ) {}

//   ngOnInit(): void {
//     this.initializeForm();
//     this.action = this.userService.GetActionRequired();
//     this.pacienteEdition = this.userService.GetPacienteEdition();

//     if (this.action === 'Edit') {
//       this.pacienteForm.setValue({
//         nome: this.pacienteEdition.nome,
//         dataNascimento: this.pacienteEdition.dataNascimento,
//         sexo: this.pacienteEdition.sexo,
//         endereco: this.pacienteEdition.endereco,
//         telefone: this.pacienteEdition.telefone,
//         email: this.pacienteEdition.email,
//         bi: this.pacienteEdition.bi,
//         contatoEmergenciaNome: this.pacienteEdition.contatoEmergenciaNome,
//         contatoEmergenciaTelefone: this.pacienteEdition.contatoEmergenciaTelefone,
//         contatoEmergenciaRelacao: this.pacienteEdition.contatoEmergenciaRelacao,
//         historicoMedico: this.pacienteEdition.historicoMedico,
//         seguro: this.pacienteEdition.seguro,
//         status: this.pacienteEdition.status,
//         leito: this.pacienteEdition.leito
//       });
//     }
//   }

//   initializeForm(): void {
//     this.pacienteForm = new FormGroup({
//       nome: new FormControl('', [Validators.required]),
//       dataNascimento: new FormControl('', [Validators.required]),
//       sexo: new FormControl('', [Validators.required]),
//       endereco: new FormControl('', [Validators.required]),
//       telefone: new FormControl('', [Validators.required]),
//       email: new FormControl('', [Validators.required, Validators.email]),
//       bi: new FormControl('', [Validators.required]),
//       contatoEmergenciaNome: new FormControl('', [Validators.required]),
//       contatoEmergenciaTelefone: new FormControl('', [Validators.required]),
//       contatoEmergenciaRelacao: new FormControl('', [Validators.required]),
//       historicoMedico: new FormControl(''),
//       seguro: new FormControl(''),
//       status: new FormControl(true),
//       leito: new FormControl(null)
//     });
//   }

//   submit(): void {
//     if (this.pacienteForm.valid) {
//       const pacienteData: Paciente = {
//         ...this.pacienteForm.value
//       };

//       if (this.action === 'Edit') {
//         pacienteData.pacienteID = this.pacienteEdition.pacienteID;

//         this.userService.UpdatePaciente(pacienteData).subscribe(
//           (response) => {
//             this.showSuccessMessage('Paciente atualizado com sucesso!');
//             this.dialogRef.close(true);
//             location.reload();
//           },
//           (error) => {
//             console.error('Erro ao atualizar paciente:', error);
//           }
//         );
//       } else {
//         this.userService.CreatePaciente(pacienteData).subscribe(
//           (response) => {
//             this.showSuccessMessage('Paciente criado com sucesso!');
//             this.dialogRef.close(true);
//             location.reload();
//           },
//           (error) => {
//             console.error('Erro ao criar paciente:', error);
//           }
//         );
//       }
//     } else {
//       this.showErrorMessage('Por favor, preencha todos os campos obrigatórios.');
//       this.pacienteForm.markAllAsTouched();
//     }
//   }

//   Close(): void {
//     this.dialogRef.close(false);
//   }

//   showSuccessMessage(message: string) {
//     Swal.fire({
//       icon: 'success',
//       title: message,
//       showConfirmButton: false,
//       timer: 2000,
//     });
//   }

//   showErrorMessage(message: string) {
//     Swal.fire({
//       icon: 'error',
//       title: 'Erro!',
//       text: message,
//       showConfirmButton: false,
//       timer: 2000,
//     });
//   }
}
