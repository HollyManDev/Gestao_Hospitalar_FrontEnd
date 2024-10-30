import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/Models/Paciente';
import { PacienteCrudTemplateComponent } from '../../PacienteCrud/paciente-crud-template/paciente-crud-template.component';
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente-view-template',
  templateUrl: './paciente-view-template.component.html',
  styleUrls: ['./paciente-view-template.component.scss']
})
export class PacienteViewTemplateComponent implements OnInit {
  pacientes: Paciente[] = [];
  dataSource: MatTableDataSource<Paciente> = new MatTableDataSource<Paciente>([]);
  displayedColumns: string[] = [
    'pacienteID', 'nome', 'dataNascimento', 'sexo', 'endereco', 'telefone', 'email', 
    'bi','historicoMedico', 'seguro', 'leito', 'status', 'edit', 'remove'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private userService: UserServiceService) {}

  ngOnInit(): void {
    this.getPacientes();
  }

  getPacientes(): void {
    this.userService.GetPacientes().subscribe(userData => {
      if (userData.data) {
        this.pacientes = userData.data;
        this.updatePacienteList();
      }
    });
  }

  updatePacienteList(): void {
    this.dataSource.data = this.pacientes;
    this.dataSource.paginator = this.paginator;
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim().toLowerCase();
    this.dataSource.filter = value;
    if (value) {
      this.dataSource.filterPredicate = (data: Paciente, filter: string) =>
        data.nome.toLowerCase().includes(filter);
    } else {
      this.dataSource.filterPredicate = () => true;
    }
    this.updatePacienteList();
  }

  addPaciente(): void {
    this.userService.SetActionRequired('Add');
    this.openModal();
  }

  editPaciente(paciente: Paciente): void {
    if (paciente.status) {
      this.userService.SetActionRequired('Edit');
      this.userService.SetPacienteEdition(paciente);
      this.openModal();
    } else {
      this.showErrorMessage('Informação indisponível para edição!');
    }
  }

  removePaciente(paciente: Paciente): void {
    if (!paciente.status) {
      this.alreadyDeleted();
    } else {
      this.confirmDelete().then(confirmed => {
        if (confirmed) {
          this.userService.DeletePaciente(paciente).subscribe(() => {
            this.getPacientes();
            this.showSuccessMessage('Paciente deletado com sucesso!');
          });
        }
      });
    }
  }

  openModal(): void {
    const dialogRef = this.dialog.open(PacienteCrudTemplateComponent, {
      width: '960px',
     
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPacientes();
    });
  }

  showErrorMessage(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: message,
    });
  }

  showSuccessMessage(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Sucesso',
      text: message,
    });
  }

  alreadyDeleted(): void {
    this.showErrorMessage('Paciente já removido.');
  }

  confirmDelete(): Promise<boolean> {
    return Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then(result => result.isConfirmed);
  }
}
