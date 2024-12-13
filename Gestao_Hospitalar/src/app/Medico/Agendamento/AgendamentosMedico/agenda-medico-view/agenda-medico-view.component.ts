import { Component, ViewChild } from '@angular/core';
import { Agendamento } from 'src/app/Models/Agendamento';
import Swal from 'sweetalert2';
import { AgendaMedicoCrudComponent } from '../agenda-medico-crud/agenda-medico-crud.component';
import { UserServiceService } from 'src/app/Service/user-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Paciente } from 'src/app/Models/Paciente';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-agenda-medico-view',
  templateUrl: './agenda-medico-view.component.html',
  styleUrls: ['./agenda-medico-view.component.scss']
})
export class AgendaMedicoViewComponent {

  agenda:Agendamento[] = [];
  paciente:Paciente[] = [];
  medicoId: number = 0;
  dataSource: MatTableDataSource<Agendamento> = new MatTableDataSource<Agendamento>([]);
  displayedColumns: string[] = [
    'Id', 
    'Paciente', 
    'TipoAgendamento', 
    'DataHora', 
    'Descricao', 
    'Status', 
    'Agendamento',
    'Edit',
    'Remove'
  ];
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
   
  
    this.GetAgendamentos();
    this.GetPacientes()
    this.updateUserList();
  }

 GetAgendamentos(): void {
  this.medicoId = this.userService.GetUserAuthenticated();
      
      if(this.medicoId){
        this.userService.GetAgendamentosByMedico(this.medicoId).subscribe(userData => {
    
          if(userData.data){
            this.agenda = userData.data;
            this.updateUserList();
          }
      
        });
      }

  }
  
  GetPacientes(): void {
    this.userService.GetPacientes().subscribe(userData => {
      if (userData.data) {
        this.paciente = userData.data;
        
      }
    });
  }
  openModal(): void {
    const dialogRef = this.dialog.open(AgendaMedicoCrudComponent, {
      height: '515px',
      width: '390px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal foi fechado. Resultado:', result);
    
      this.updateUserList();
    });
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim().toLowerCase();
  
    // Defina o filtro do MatTableDataSource
    this.dataSource.filter = value;
  
    // Se o filtro não estiver vazio, faz o filtro
    if (value) {

      this.dataSource.filterPredicate = (data:Agendamento, filter: string) => {
        return data.tipoAgendamento.toLowerCase().includes(filter)  || this.getPacienteName(data.pacienteID).toLowerCase().includes(filter) ;
      };
    } else {
      // Se o valor de filtro estiver vazio, mostre todos os dados
      this.dataSource.filterPredicate = () => true;
    }
  
    // Atualize a lista de departamentos
    this.updateUserList();
  }

  getPacienteName(leitoId: number): string {  
    const leitoName = this.paciente.find(l => l.pacienteID === leitoId);
    return leitoName ? leitoName.nome : 'Sem Paciente';
  }  
 

  addAgendamento(): void {
    this.userService.SetActionRequired('Add');
    this.openModal();
  }
  
  ConfirmarAgendamento(cama: Agendamento): void {
    if(cama.status){
      
          cama.status = 'Confirmado'     
    this.userService.UpdateAgendamento(cama).subscribe(() => {
      this.updateUserList();
      this.showSuccessMessage('Agendamento Confirmado!');
     
    });   
     }
     else{
      this.showErrorMessage('Informacao da Agenda esta indisponivel para edicoes!');
     }
  }
  
 Pendente(cama: Agendamento): void {
  cama.status = 'Pendente' 
    this.userService.UpdateAgendamento(cama).subscribe(() => {
      this.updateUserList();
      this.showSuccessMessage('Agendamento Pendente!');
    });
  }
  editAgendamento(cama: Agendamento): void {
       if(cama.status){
        this.userService.SetActionRequired('Edit');
        this.userService.SetAgendamentoEdition(cama);
        this.openModal();
       }
       else{
        this.showErrorMessage('Informacao da cama esta indisponivel para edicoes!');
       }
  }


  
  async removeAgendamento(cama: Agendamento): Promise<void> {
    if (cama.status === 'Cancelado') {
      this.alreadyDeleted();
    } else {
      const confirmed = await this.confirmDelete();
      if (confirmed) {
      
        cama.status = 'Cancelado'
        this.userService.UpdateAgendamento(cama).subscribe(
          (response) => {
          
            this.userService.GetAgendamento().subscribe(userData => {
             
              if(userData.data){
                this.agenda = userData.data;
                this.updateUserList();
              }
            });
            this.router.navigate(['/InicioAdmin/Agendamento']);
            this.showSuccessMessage('Data Deleted Successfully');
          },
          (error) => {
            console.error('Erro ao deletar Agendamento:', error);
          }
        );
      }
    }
  }

  showSuccessMessage(message: string): void {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 2000
    });
  }

  alreadyDeleted(): void {
    Swal.fire({
      icon: 'error',
      title: 'Cannot delete, it is already unavailable!',
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
  confirmDelete(): Promise<boolean> {
    return Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  updateUserList(): void {
    this.dataSource.data = this.agenda; // Atualiza os dados da tabela
    if (this.paginator) {
      this.dataSource.paginator = this.paginator; // Conecta o paginator ao dataSource
    }
  }
}
