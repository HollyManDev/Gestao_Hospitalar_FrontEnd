import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Medico } from 'src/app/Models/Medico';
import { MedicoCrudTemplateComponent } from '../../MedicoCrud/medico-crud-template/medico-crud-template.component';
import { UserServiceService } from 'src/app/Service/user-service.service';
import { Especialidade } from 'src/app/Models/Especialidade';

@Component({
  selector: 'app-medico-view-template',
  templateUrl: './medico-view-template.component.html',
  styleUrls: ['./medico-view-template.component.scss']
})
export class MedicoViewTemplateComponent implements OnInit {
  medicos: Medico[] = [];
  especialidades: Especialidade[]=[];
  dataSource: MatTableDataSource<Medico> = new MatTableDataSource<Medico>([]);

  displayedColumns: string[] = ['Id', 'Nome', 'Especialidade', 'Telefone',  'Email', 'Endereco', 'Horario_Trabalho', 'Status', 'Edit', 'Remove'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.getMedicos();
    this.updateMedicoList();
  }

  getMedicos(): void {
    this.userService.GetMedicos().subscribe(userData => {
      if (userData.data) {
        this.medicos = userData.data;
        this.getEspecialidades();
        this.updateMedicoList();
      }
    });
  }

  getEspecialidades(): void {
    this.userService.GetEspecialidades().subscribe(userData => {
      if (userData.data) {
        this.especialidades = userData.data;
      }
    });
  }

  
  getEspecialidadeName(espId: number): string {  
    const espName = this.especialidades.find(esp => esp.especialidadeID === espId);
    return espName ? espName.nome : 'Unknown';
  }

  openModal(): void {
    const dialogRef = this.dialog.open(MedicoCrudTemplateComponent, {
      height: '700px',
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updateMedicoList();
    });
  }

  
  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim().toLowerCase();
  
    // Defina o filtro do MatTableDataSource
    this.dataSource.filter = value;
  
    // Se o filtro não estiver vazio, faz o filtro
    if (value) {
      this.dataSource.filterPredicate = (data:Medico, filter: string) => {
        return data.nome.toLowerCase().includes(filter);
      };
    } else {
      // Se o valor de filtro estiver vazio, mostre todos os dados
      this.dataSource.filterPredicate = () => true;
    }
  
    // Atualize a lista de departamentos
    this.updateMedicoList();
  }
  addMedico(): void {
    this.userService.SetActionRequired('Add');
    this.openModal();
  }

  editMedico(medico: Medico): void {
    this.userService.SetActionRequired('Edit');
    this.userService.SetMedicoEdition(medico);
    this.openModal();
  }

  async removeMedico(medico: Medico): Promise<void> {
    const confirmed = await this.confirmDelete();
    if (confirmed) {
      this.userService.DeleteMedico(medico).subscribe(
        () => {
          this.getMedicos();
          this.showSuccessMessage();
        },
        (error) => {
          console.error('Erro ao deletar Médico:', error);
        }
      );
    }
  }

  showSuccessMessage(): void {
    Swal.fire({
      icon: 'success',
      title: 'Médico deletado com sucesso',
      showConfirmButton: false,
      timer: 2000
    });
  }

  confirmDelete(): Promise<boolean> {
    return Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá recuperar este dado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  updateMedicoList(): void {
    this.dataSource.data = this.medicos;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
