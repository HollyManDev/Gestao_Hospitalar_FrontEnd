import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-view-template.component.html',
  styleUrls: ['./paciente-view-template.component.scss']
})
export class PacienteViewTemplateComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // pacientes = new MatTableDataSource<any>();
  // displayedColumns: string[] = ['nome', 'dataNascimento', 'sexo', 'telefone', 'email', 'actions'];
  // totalPacientes: number = 0;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  // constructor(
  //   private dialog: MatDialog,
  //   private userService: UserServiceService
  // ) {}

  // ngOnInit(): void {
  //   this.loadPacientes();
  // }

  // loadPacientes(event?: any): void {
  //   const pageIndex = event?.pageIndex ?? 0;
  //   const pageSize = event?.pageSize ?? 10;

  //   this.userService.GetPacientes(pageIndex, pageSize).subscribe(
  //     (data) => {
  //       this.pacientes.data = data.pacientes;
  //       this.totalPacientes = data.total;
  //       this.pacientes.paginator = this.paginator;
  //       this.pacientes.sort = this.sort;
  //     },
  //     (error) => {
  //       console.error('Erro ao carregar pacientes:', error);
  //     }
  //   );
  // }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.pacientes.filter = filterValue.trim().toLowerCase();
  // }

  // editPaciente(paciente: any): void {
  //   this.userService.SetPacienteEdition(paciente);
  //   this.dialog.open(PacienteCrudTemplateComponent, {
  //     width: '600px'
  //   }).afterClosed().subscribe(result => {
  //     if (result) {
  //       this.loadPacientes();
  //     }
  //   });
  // }

  // deletePaciente(pacienteID: number): void {
  //   Swal.fire({
  //     title: 'Tem certeza?',
  //     text: "Essa ação não pode ser desfeita!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Sim, excluir!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.userService.DeletePaciente(pacienteID).subscribe(
  //         (response) => {
  //           Swal.fire(
  //             'Excluído!',
  //             'Paciente foi excluído com sucesso.',
  //             'success'
  //           );
  //           this.loadPacientes();
  //         },
  //         (error) => {
  //           console.error('Erro ao excluir paciente:', error);
  //         }
  //       );
  //     }
  //   });
  // }
}
