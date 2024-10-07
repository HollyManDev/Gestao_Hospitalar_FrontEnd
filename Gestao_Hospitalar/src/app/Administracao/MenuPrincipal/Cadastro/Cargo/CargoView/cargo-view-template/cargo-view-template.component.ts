import { Component, ViewChild } from '@angular/core';
import { Cargo } from 'src/app/Models/Cargo';
import Swal from 'sweetalert2';
import { CargoCrudTemplateComponent } from '../../CargoCrud/cargo-crud-template/cargo-crud-template.component';
import { UserServiceService } from 'src/app/Service/user-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cargo-view-template',
  templateUrl: './cargo-view-template.component.html',
  styleUrls: ['./cargo-view-template.component.scss']
})
export class CargoViewTemplateComponent {
  cargos: Cargo[] = [];
  dataSource: MatTableDataSource<Cargo> = new MatTableDataSource<Cargo>([]);
  displayedColumns: string[] = ['Id', 'Descricao', 'Status', 'Edit', 'Remove'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.GetCargos();
  }

  GetCargos(): void {
    this.userService.GetCargos().subscribe(userData => {
      if (userData.data) {
        this.cargos = userData.data;
        this.updateUserList();
      }
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(CargoCrudTemplateComponent, {
      height: '210px',
      width: '30%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.GetCargos();
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
      this.dataSource.filterPredicate = (data: Cargo, filter: string) => {
        return data.descricao.toLowerCase().includes(filter);
      };
    } else {
      // Se o valor de filtro estiver vazio, mostre todos os dados
      this.dataSource.filterPredicate = () => true;
    }
  
    // Atualize a lista de departamentos
    this.updateUserList();
  }
  addCargo(): void {
    this.userService.SetActionRequired('Add');
    this.openModal();
  }

  editCargo(cargo: Cargo): void {
   
    if(cargo.status){
      this.userService.SetActionRequired('Edit');
      this.userService.SetCargoEdition(cargo);
      this.openModal();
    }
    else{
      this.showErrorMessage('Informacao Indisponivel para Edicao!');
    }
  }

  async removeCargo(cargo: Cargo): Promise<void> {
     
      if(cargo.status){
        const confirmed = await this.confirmDelete();
        if (confirmed) {
          this.userService.DeleteCargo(cargo).subscribe(
            (response) => {
              this.GetCargos();
              this.showSuccessMessage('Cargo deleted successfully!');
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
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  updateUserList(): void {
    this.dataSource.data = this.cargos;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
