import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Especialidade } from 'src/app/Models/Especialidade';
import { EspeCrudTemplateComponent } from '../../EspCrud/espe-crud-template/espe-crud-template.component';
import { UserServiceService } from 'src/app/Service/user-service.service';


@Component({
  selector: 'app-espe-view-template',
  templateUrl: './espe-view-template.component.html',
  styleUrls: ['./espe-view-template.component.scss']
})
export class EspeViewTemplateComponent implements OnInit {
  especialidades: Especialidade[] = [];
  dataSource: MatTableDataSource<Especialidade> = new MatTableDataSource<Especialidade>([]);
  displayedColumns: string[] = ['Id', 'Especialidade', 'Descricao', 'Status', 'Edit', 'Remove'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
   
    this.GetEspecialidades();
    this.updateUserList();
  }

 GetEspecialidades(): void {
  this.userService.GetEspecialidades().subscribe(userData => {
    
    if(userData.data){
      this.especialidades = userData.data;
      this.updateUserList();
    }

  });
  }
  openModal(): void {
    const dialogRef = this.dialog.open(EspeCrudTemplateComponent, {
      height: '40%',
      width: '30%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal foi fechado. Resultado:', result);
      // Atualize a lista de especialidades ou faça outras ações conforme necessário
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
      this.dataSource.filterPredicate = (data: Especialidade, filter: string) => {
        return data.nome.toLowerCase().includes(filter);
      };
    } else {
      // Se o valor de filtro estiver vazio, mostre todos os dados
      this.dataSource.filterPredicate = () => true;
    }
  
    // Atualize a lista de departamentos
    this.updateUserList();
  }

  addDep(): void {
    this.userService.SetActionRequired('Add');
    this.openModal();
  }

  editEspecialidades(esp: Especialidade): void {
      if(esp.status){
        this.userService.SetActionRequired('Edit');
        this.userService.SetEspecialidadeEdition(esp);
        this.openModal();
      }
      else{
        this.showErrorMessage('Informacao Indisponivel para Edicao!');
      }
  }

  async removeEspecialidades(esp: Especialidade): Promise<void> {
    if (!esp.status) {
      this.alreadyDeleted();
    } else {
      const confirmed = await this.confirmDelete();
      if (confirmed) {
        // Lógica para remover a especialidade
     
        this.userService.DeleteEspecialidade(esp).subscribe(
          (response) => {
          
            this.userService.GetEspecialidades().subscribe(userData => {
             
              if(userData.data){
                this.especialidades = userData.data;
                this.updateUserList();
              }
            });
            this.router.navigate(['/InicioAdmin/Especialidade']);
            this.showSuccessMessage();
          },
          (error) => {
            console.error('Erro ao deletar Esp[ecialidades]:', error);
          }
        );
      }
    }
  }

  showSuccessMessage(): void {
    Swal.fire({
      icon: 'success',
      title: 'Data Deleted Successfully',
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
  alreadyDeleted(): void {
    Swal.fire({
      icon: 'error',
      title: 'Cannot delete, it is already unavailable!',
      showConfirmButton: false,
      timer: 2000
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
    this.dataSource.data = this.especialidades; // Atualiza os dados da tabela
    if (this.paginator) {
      this.dataSource.paginator = this.paginator; // Conecta o paginator ao dataSource
    }
  }
}
