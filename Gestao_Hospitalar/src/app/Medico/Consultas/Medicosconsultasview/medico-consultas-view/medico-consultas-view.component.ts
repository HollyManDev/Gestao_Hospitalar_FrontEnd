import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ConsultaMedicoComponent } from '../../ConsultaMedicoCrud/consulta-medico/consulta-medico.component';
import { Consulta } from 'src/app/Models/Consulta';
import { UserServiceService } from 'src/app/Service/user-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/Models/Paciente';

@Component({
  selector: 'app-medico-consultas-view',
  templateUrl: './medico-consultas-view.component.html',
  styleUrls: ['./medico-consultas-view.component.scss']
})
export class MedicoConsultasViewComponent {
  consultas: Consulta[] = [];
  pacientes: Paciente[] = [];
  medicoId: number = 0
  dataSource: MatTableDataSource<Consulta> = new MatTableDataSource<Consulta>([]);
  displayedColumns: string[] = [
    'ID', 
    'Paciente', 
    'DataHora', 
    'Motivo', 
    'Diagnostico', 
    'Tratamento', 
    'Observacoes',
    'Status', 
    'Consulta',
    'Edit' 
   
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    
    this.getConsultas();
    this.getPacientes();

    this.updateConsultaList();
  }

  getConsultas(): void {
    this.medicoId = this.userService.GetUserAuthenticated();

    if(this.medicoId){
       
      this.userService.GetConsultasByMedico(this.medicoId).subscribe(data => {
        if (data) {
          this.consultas = data.data;
          this.updateConsultaList();
        }
      });
    }
    
  }

  

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim().toLowerCase();
  
    // Defina o filtro do MatTableDataSource
    this.dataSource.filter = value;
  
    // Se o filtro não estiver vazio, faz o filtro
    if (value) {

      this.dataSource.filterPredicate = (data:Consulta, filter: string) => {
        return data.tratamentoRecomendado.toLowerCase().includes(filter) || data.observacoes.toLowerCase().includes(filter) || this.getPacienteName(data.pacienteID).toLowerCase().includes(filter);
      };
    } else {
      // Se o valor de filtro estiver vazio, mostre todos os dados
      this.dataSource.filterPredicate = () => true;
    }
  
    // Atualize a lista de departamentos
    this.updateConsultaList();
  }
  getPacientes(): void {
    this.userService.GetPacientes().subscribe(data => {
      if (data) {
        this.pacientes = data.data;
      }
    });
  }

  getPacienteName(id: number): string {
    const paciente = this.pacientes.find(p => p.pacienteID === id);
    return paciente ? paciente.nome : 'Desconhecido';
  }

 
  addConsulta(): void {
    this.userService.SetActionRequired('Add');
    this.openModal();
  }

  editConsulta(consulta: Consulta): void {
    this.userService.SetActionRequired('Edit');
    this.userService.SetConsultaEdition(consulta);
    this.openModal();
  }
  
  ConcluirConsulta(cama: Consulta): void {
    if(cama.status){
      
          cama.status = 'Concluida'     
    this.userService.UpdateConsulta(cama).subscribe(() => {
      this.updateConsultaList();
      this.showSuccessMessage('Consulta Concluida!');
     
    });   
     }
     else{
      this.showErrorMessage('Informacao da cama esta indisponivel para edicoes!');
     }
  }
  
 notFinished(cama: Consulta): void {
  cama.status = 'Andamento' 
    this.userService.UpdateConsulta(cama).subscribe(() => {
      this.updateConsultaList();
      this.showSuccessMessage('Consulta em andamento!');
    });
  }

  // removeConsulta(consulta: Consulta): void {
  //   Swal.fire({
  //     title: 'Confirmação',
  //     text: 'Tem certeza que deseja remover esta consulta?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Sim, remover',
  //     cancelButtonText: 'Cancelar'
  //   }).then(result => {
  //     if (result.isConfirmed) {
  //       this.userService.DeleteConsulta(consulta).subscribe(() => {
  //         this.getConsultas();
  //         Swal.fire('Removido!', 'A consulta foi removida com sucesso.', 'success');
  //       });
  //     }
  //   });
  // }

  openModal(): void {
    const dialogRef = this.dialog.open(ConsultaMedicoComponent, {
      height: '700px',
      width: '30%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getConsultas();
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
  showSuccessMessage(message: string): void {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 2000
    });
  }
  updateConsultaList(): void {
    this.dataSource.data = this.consultas;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
