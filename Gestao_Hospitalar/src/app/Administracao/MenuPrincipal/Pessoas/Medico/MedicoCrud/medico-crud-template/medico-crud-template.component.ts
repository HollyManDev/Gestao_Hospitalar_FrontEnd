import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserServiceService } from 'src/app/Service/user-service.service';
import { Medico } from 'src/app/Models/Medico';
import Swal from 'sweetalert2';
import { Especialidade } from 'src/app/Models/Especialidade';

@Component({
  selector: 'app-medico-crud-template',
  templateUrl: './medico-crud-template.component.html',
  styleUrls: ['./medico-crud-template.component.scss']
})
export class MedicoCrudTemplateComponent {
  action: string = '';
  medicoEdition!: Medico;
  medicoForm!: FormGroup;
  typeButton: string = '';
  especialidades: Especialidade[] = [];
  medicos: Medico[] = [];
  espId: number = 0;
  espName: string = '';

  constructor(
    private dialogRef: MatDialogRef<MedicoCrudTemplateComponent>,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.getEspecialidades();
    this.action = this.userService.GetActionRequired();
    this.medicoEdition = this.userService.GetMedicoEdition();
    this.initializeForm();
  }

  getEspecialidades(): void {
    this.userService.GetEspecialidades().subscribe(userData => {
      if (userData.data) {
        this.especialidades = userData.data;
        this.typeButton = this.action === 'Edit' ? 'Save' : 'Add';
        this.espName = this.action === 'Edit' ? this.getEspecialidadeName(this.medicoEdition.especialidadeID) : '';
        this.initializeForm(this.action === 'Edit' ? this.medicoEdition : undefined);
      }
    });
  }

  getEspecialidadeID(esp: Especialidade): void {
    this.espId = esp.especialidadeID;
  }

  ifExist(medicoEdition: Medico, medicoData: Medico): boolean {
    return medicoEdition.nome === medicoData.nome &&
           medicoEdition.telefone === medicoData.telefone &&
           medicoEdition.email === medicoData.email &&
           medicoEdition.endereco === medicoData.endereco &&
           medicoEdition.horarioTrabalho === medicoData.horarioTrabalho;
  }

  getEspecialidadeName(esp: number): string {  
    const espName = this.especialidades.find(l => l.especialidadeID === esp);
    return espName ? espName.nome : 'Unknown';
  }

  VerifyEmail(email: string): boolean {  
    // Verifica se o email já existe entre os médicos, ignorando o médico em edição
    return this.medicos.some(l => l.email === email && l.medicoID !== this.medicoEdition.medicoID);
  }

  initializeForm(medico?: Medico): void {
    this.medicoForm = new FormGroup({
      nome: new FormControl(medico ? medico.nome : '', [Validators.required]),
      especialidadeID: new FormControl(medico ? medico.especialidadeID : '', [Validators.required]), // Usa especialidadeID diretamente
      telefone: new FormControl(medico ? medico.telefone : '', [Validators.required]),
      email: new FormControl(medico ? medico.email : '', [Validators.required, Validators.email]),
      endereco: new FormControl(medico ? medico.endereco : ''),
      horarioTrabalho: new FormControl(medico ? medico.horarioTrabalho : ''),
      status: new FormControl(medico ? medico.status : true),
    });
  }

  submit() {
    if (this.medicoForm.valid) {
      const medicoData: Medico = this.medicoForm.value;
      medicoData.especialidadeID = this.espId; // Passa o ID da especialidade

      if (this.action === 'Edit') {
        if (!this.ifExist(this.medicoEdition, medicoData)) {
          medicoData.medicoID = this.medicoEdition.medicoID;

          // Verifica se o email é novo ou se é o mesmo do médico que está sendo editado
          const emailExists = this.VerifyEmail(medicoData.email);
          if (emailExists) {
            this.showErrorMessage('Por favor, escolha outro email, esse já está em uso!');
          } else {
            this.userService.UpdateMedico(medicoData).subscribe(
              () => {
                this.showSuccessMessage('Médico atualizado com sucesso');
                this.closeDialog();
              },
              error => {
                this.showErrorMessage('Erro ao atualizar médico: ' + error.message);
              }
            );
          }
        } else {
          this.showErrorMessage('Não houve nenhuma mudança em relação aos dados que pretende atualizar!');
        }
      } else if (this.action === 'Add') {
        const emailExists = this.VerifyEmail(medicoData.email);
        if (emailExists) {
          this.showErrorMessage('Por favor, escolha outro email, esse já existe!');
        } else {
          this.userService.CreateMedico(medicoData).subscribe(
            () => {
              this.showSuccessMessage('Médico salvo com sucesso');
              this.closeDialog();
            },
            error => {
              this.showErrorMessage('Erro ao salvar médico: ' + error.message);
            }
          );
        }
      }
    } else {
      this.showErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      this.medicoForm.markAllAsTouched();
    }
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }

  // Método Close
  Close(): void {
    this.dialogRef.close(true);
  }

  showSuccessMessage(title: string) {
    Swal.fire({
      icon: 'success',
      title: title,
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
