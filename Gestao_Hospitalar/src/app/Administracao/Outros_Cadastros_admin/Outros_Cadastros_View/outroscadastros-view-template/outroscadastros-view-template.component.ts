import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Outros } from 'src/app/Models/Outros';
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';
import { OutroscadastrosCrudTemplateComponent } from '../../Outros_Cadastros_Crud/outroscadastros-crud-template/outroscadastros-crud-template.component';

@Component({
  selector: 'app-outroscadastros-view-template',
  templateUrl: './outroscadastros-view-template.component.html',
  styleUrls: ['./outroscadastros-view-template.component.scss']
})
export class OutroscadastrosViewTemplateComponent {
  leitos: Outros[] = [];
  dataSource: MatTableDataSource<Outros> = new MatTableDataSource<Outros>([]);
  displayedColumns: string[] = ['Id', 'Descricao', 'Type', 'Status', 'Edit', 'Remove'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.GetLeitos();
  }

  GetLeitos(): void {
    this.userService.GetOutros().subscribe(userData => {
      if (userData.data) {
        this.leitos = userData.data;
        this.updateUserList();
      }
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(OutroscadastrosCrudTemplateComponent, {
      height: '300px',
      width: '30%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.GetLeitos();
      }
    });
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim().toLowerCase();
  
    // Defina o filtro do MatTableDataSource
    this.dataSource.filter = value;
  
    // Se o filtro não estiver vazio, faz o filtro
    if (value) {
      this.dataSource.filterPredicate = (data: Outros, filter: string) => {
        return data.nome.toLowerCase().includes(filter) || data.type.toLowerCase().includes(filter);
      };
    } else {
      // Se o valor de filtro estiver vazio, mostre todos os dados
      this.dataSource.filterPredicate = () => true;
    }
  
    // Atualize a lista de departamentos
    this.updateUserList();
  }
  addLeito(): void {
    this.userService.SetActionRequired('Add');
    this.openModal();
  }

  editLeito(leito: Outros): void {
   
    if(leito.status){
      this.userService.SetActionRequired('Edit');
      this.userService.SetOutroEdition(leito);
      this.openModal();
    }
    else{
      this.showErrorMessage('Informacao Indisponivel para Edicao!');
    }
  }

  async removeLeito(leito: Outros): Promise<void> {
     
      if(leito.status){
        const confirmed = await this.confirmDelete();
        if (confirmed) {
          this.userService.DeleteOutro(leito).subscribe(
            (response) => {
              this.GetLeitos();
              this.showSuccessMessage('Leito deleted successfully!');
            },
            (error) => {
              console.error('Error deleting Leito:', error);
            }
          );
        }
      }
      else{
          this.showErrorMessage('Informacao Indisponivel para Remocao!');
      }
  }

  showSuccessMessage(message: string): void {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 2000,
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
      confirmButtonText: 'Yes, delete it!',
    }).then((result: { isConfirmed: any; }) => {
      return result.isConfirmed;
    });
  }

  updateUserList(): void {
    this.dataSource.data = this.leitos;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
