import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Consulta } from 'src/app/Models/Consulta';
import { Paciente } from 'src/app/Models/Paciente';
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta-medico',
  templateUrl: './consulta-medico.component.html',
  styleUrls: ['./consulta-medico.component.scss']
})
export class ConsultaMedicoComponent {
  action: string = '';
  consultaEdition!: Consulta;
  pacienteId: number = 0
  medicoId: number = 0
  consultaForm!: FormGroup;
  typeButton: string = '';
  pacientes: Paciente[] = [];
 
  constructor(
    private dialogRef: MatDialogRef<ConsultaMedicoComponent>,
    private userService: UserServiceService
  ) {}

  
  ngOnInit(): void {
    this.action = this.userService.GetActionRequired();
    this.consultaEdition = this.userService.GetConsultaEdition();
     this.medicoId = this.userService.GetUserAuthenticated();
    this.GetPacientes();
 
    this.initializeForm();
  }

  initializeForm(): void {

    if(this.consultaEdition){
      this.pacienteId = this.consultaEdition.pacienteID
      this.medicoId = this.consultaEdition.medicoID
    }

    this.consultaForm = new FormGroup({
      dataHora: new FormControl(this.consultaEdition?.dataHora || '', [Validators.required]),
      motivo: new FormControl(this.consultaEdition?.motivo || '', [Validators.required]),
      observacoes: new FormControl(this.consultaEdition?.observacoes || ''),
      diagnostico: new FormControl(this.consultaEdition?.diagnostico || ''),
      tratamentoRecomendado: new FormControl(this.consultaEdition?.tratamentoRecomendado || ''),
      _pacienteID: new FormControl(this.consultaEdition?.pacienteID || '', [Validators.required]),
      get pacienteID() {
        return this._pacienteID;
      },
      set pacienteID(value) {
        this._pacienteID = value;
      },
      
    });

    this.typeButton = this.action === 'Edit' ? 'Save' : this.action === 'Add' ? 'Add' : 'Save';
  }

  GetPacientes(): void {
    this.userService.GetPacientes().subscribe(
      (data) => {
        if (data) {
          this.pacientes = data.data;
          this.consultaForm.controls['pacienteID'].setValue(this.getPacienteName(this.consultaEdition.pacienteID));
        }
      },
      (error) => console.error('Error fetching patients:', error)
    );
  }

 

  getPacienteName(leitoId: number): string {
    const leito = this.pacientes.find(l => l.pacienteID === leitoId);
    return leito ? leito.nome : 'Unknown Paciente';
  }
  getPacienteId(leito: Paciente): void {
    this.pacienteId = leito.pacienteID;
  }

  submit(): void {
    if (this.consultaForm.invalid) {
      this.showErrorMessage('Please fill out all required fields.');
      this.consultaForm.markAllAsTouched();
      return;
    }

    const consultaData: Consulta = { ...this.consultaForm.value };

    if (this.action === 'Edit') {

      consultaData.consultaID = this.consultaEdition.consultaID;
      consultaData.medicoID = this.medicoId
      consultaData.pacienteID = this.pacienteId
      consultaData.status = this.consultaEdition.status
    
      this.handleUpdateConsulta(consultaData);
    } else if (this.action === 'Add') {
      consultaData.pacienteID = this.pacienteId
      consultaData.medicoID = this.medicoId
      consultaData.status = 'Andamento'
      this.handleCreateConsulta(consultaData);
    }
  }

  handleUpdateConsulta(consultaData: Consulta): void {
    if (this.isUnchanged(consultaData)) {
      this.showErrorMessage('Cannot update, make sure you have changed at least one field!');
      return;
    }

    this.userService.UpdateConsulta(consultaData).subscribe(
      () => this.showSuccessMessage('Consulta updated successfully!'),
      (error) => console.error('Error updating Consulta:', error)
    );
    this.dialogRef.close(true);
    location.reload();
  }

  handleCreateConsulta(consultaData: Consulta): void {
    this.userService.CreateConsulta(consultaData).subscribe(
      () => {
        this.showSuccessMessage('Consulta created successfully!');
        this.dialogRef.close(true);
        location.reload();
      },
      (error) => console.error('Error creating Consulta:', error)
    );
  }

  isUnchanged(consultaData: Consulta): boolean {
    return (
      consultaData.diagnostico === this.consultaEdition.diagnostico &&
      consultaData.dataHora === this.consultaEdition.dataHora &&
      consultaData.pacienteID === this.consultaEdition.pacienteID &&
      consultaData.observacoes === this.consultaEdition.observacoes &&
      consultaData.motivo === this.consultaEdition.motivo &&
      consultaData.tratamentoRecomendado === this.consultaEdition.tratamentoRecomendado
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
      timer: 2000,
    });
  }

  showErrorMessage(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: message,
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
