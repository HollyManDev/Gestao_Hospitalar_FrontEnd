import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Agendamento } from 'src/app/Models/Agendamento';
import { Paciente } from 'src/app/Models/Paciente';
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agenda-medico-crud',
  templateUrl: './agenda-medico-crud.component.html',
  styleUrls: ['./agenda-medico-crud.component.scss']
})
export class AgendaMedicoCrudComponent {
  action: string = '';
  agendamentoForm!: FormGroup;
  typeButton: string = '';
  tiposAgendamento: string[] = ['Consulta', 'Exame', 'Procedimento'];
  pacientes: Paciente[] = [];
  agendamentoEdicao!: Agendamento;
  medicoId: number = 0;
  pacienteId: number = 0;

  constructor(
    private dialogRef: MatDialogRef<AgendaMedicoCrudComponent>,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.action = this.userService.GetActionRequired();
    this.medicoId = this.userService.GetUserAuthenticated();
    this.agendamentoEdicao = this.userService.GetAgendamentoEdition();
   
    this.GetPacientes();
   
    this.initializeForm();
  }

  initializeForm(): void {

    if(this.agendamentoEdicao){
      this.pacienteId = this.agendamentoEdicao.pacienteID
    
    }

    this.agendamentoForm = new FormGroup({
      tipoAgendamento: new FormControl(this.agendamentoEdicao?.tipoAgendamento || '', [Validators.required]),
      dataHora: new FormControl(this.agendamentoEdicao?.dataHora || '', [Validators.required]),
      pacienteID: new FormControl(this.agendamentoEdicao?.pacienteID || '', [Validators.required]),
      observacoes: new FormControl(this.agendamentoEdicao?.observacoes || '')
    });

    this.typeButton = this.action === 'Edit' ? 'Save' : this.action === 'Add' ? 'Add' : 'Save';
  }

  GetPacientes(): void {
    this.userService.GetPacientes().subscribe(
      (data) => {
        if (data) {
          this.pacientes = data.data;
          this.agendamentoForm.controls['pacienteID'].setValue(this.getPacienteName(this.agendamentoEdicao.pacienteID));
        }
      },
      (error) => console.error('Error fetching patients:', error)
    );
  }

 

 
  getPacienteId(leito: Paciente): void {
    this.pacienteId = leito.pacienteID;
  }

  getPacienteName(leitoId: number): string {
    const leito = this.pacientes.find(l => l.pacienteID === leitoId);
    return leito ? leito.nome : 'Unknown Paciente';
  }


  submit(): void {
    if (this.agendamentoForm.invalid) {
      this.showErrorMessage('Please fill out all required fields.');
      this.agendamentoForm.markAllAsTouched();
      return;
    }

    const agendamentoData = this.agendamentoForm.value;
    if (this.action === 'Edit' && this.medicoId) {
      agendamentoData.agendamentoID = this.agendamentoEdicao.agendamentoID;
      agendamentoData.medicoID = this.medicoId
      agendamentoData.pacienteID = this.pacienteId
      agendamentoData.status = this.agendamentoEdicao.status
 
      this.handleUpdateAgendamento(agendamentoData);
    } else if (this.action === 'Add' && this.medicoId) {
      agendamentoData.pacienteID = this.pacienteId
      agendamentoData.medicoID = this.medicoId
      agendamentoData.status = 'Pendente'
      agendamentoData.statusExist = true;
      this.handleCreateAgendamento(agendamentoData);
    }
    else{
        this.showErrorMessage('Tempo esgotado, faca o Login novamente')
    }
  }

  handleUpdateAgendamento(agendamentoData: Agendamento): void {
  
    if (this.isUnchanged(agendamentoData)) {
      this.showErrorMessage('No changes detected. Please modify at least one field.');
      return;
    }

    this.userService.UpdateAgendamento(agendamentoData).subscribe(
      () => {
        this.showSuccessMessage('Appointment updated successfully!');
        this.dialogRef.close(true);
        location.reload();
      },
      (error) => console.error('Error updating appointment:', error)
    );
  }

  handleCreateAgendamento(agendamentoData: any): void {
    this.userService.CreateAgendamento(agendamentoData).subscribe(
      () => {
        this.showSuccessMessage('Appointment created successfully!');
        this.dialogRef.close(true);
        location.reload();
      },
      (error) => console.error('Error creating appointment:', error)
    );
  }

  isUnchanged(agendamentoData: Agendamento): boolean {
    return (
      agendamentoData.tipoAgendamento === this.agendamentoEdicao.tipoAgendamento &&
      agendamentoData.dataHora === this.agendamentoEdicao.dataHora &&
      agendamentoData.pacienteID === this.agendamentoEdicao.pacienteID &&
      agendamentoData.medicoID === this.agendamentoEdicao.medicoID &&
      agendamentoData.observacoes === this.agendamentoEdicao.observacoes
    );
  }

  Close(): void {
    this.dialogRef.close(false);
  }

  showSuccessMessage(message: string): void {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 2000
    });
  }

  showErrorMessage(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: message,
      showConfirmButton: false,
      timer: 2000
    });
  }

}
