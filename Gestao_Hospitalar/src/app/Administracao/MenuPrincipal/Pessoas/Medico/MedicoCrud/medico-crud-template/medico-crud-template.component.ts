import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserServiceService } from 'src/app/Service/user-service.service';
import { Medico } from 'src/app/Models/Medico';
import Swal from 'sweetalert2';

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

  constructor(
    private dialogRef: MatDialogRef<MedicoCrudTemplateComponent>,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.action = this.userService.GetActionRequired();
    this.medicoEdition = this.userService.GetMedicoEdition();

    if (this.action === 'Edit') {
      this.typeButton = 'Save';
      this.initializeForm(this.medicoEdition);
    } else if (this.action === 'Add') {
      this.typeButton = 'Add';
      this.initializeForm();
    }
  }

  initializeForm(medico?: Medico): void {
    this.medicoForm = new FormGroup({
      nome: new FormControl(medico ? medico.nome : '', [Validators.required]),
      especialidadeID: new FormControl(medico ? medico.especialidadeID : '', [Validators.required]),
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

      if (this.action === 'Edit') {
        medicoData.medicoID = this.medicoEdition.medicoID;
        this.userService.UpdateMedico(medicoData).subscribe(() => {
          this.showSuccessMessage('Médico atualizado com sucesso');
          this.dialogRef.close(true);
        });
      } else if (this.action === 'Add') {
        this.userService.CreateMedico(medicoData).subscribe(() => {
          this.showSuccessMessage('Médico salvo com sucesso');
          this.dialogRef.close(true);
        });
      }
    } else {
      this.showErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      this.medicoForm.markAllAsTouched();
    }
  }

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
