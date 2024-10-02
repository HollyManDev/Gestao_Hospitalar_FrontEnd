import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Fornecedor } from 'src/app/Models/Fornecedor';
import { FornecedorCrudTemplateComponent } from '../../FornecedorCrud/fornecedor-crud-template/fornecedor-crud-template.component';
import { UserServiceService } from 'src/app/Service/user-service.service';

@Component({
  selector: 'app-fornecedor-view-template',
  templateUrl: './fornecedor-view-template.component.html',
  styleUrls: ['./fornecedor-view-template.component.scss']
})
export class FornecedorViewTemplateComponent implements OnInit {
  fornecedores: Fornecedor[] = [];
  dataSource: MatTableDataSource<Fornecedor> = new MatTableDataSource<Fornecedor>([]);
  displayedColumns: string[] = ['Id', 'Nome', 'Nuit', 'Telefone', 'Email', 'Status', 'Edit', 'Remove'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.GetFornecedores();
    this.updateUserList();
  }

  GetFornecedores(): void {
    this.userService.GetFornecedores().subscribe(userData => {
      if (userData.data) {
        this.fornecedores = userData.data;
        this.updateUserList();
      }
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(FornecedorCrudTemplateComponent, {
      height: '490px',
      width: '30%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
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
      this.dataSource.filterPredicate = (data:Fornecedor, filter: string) => {
        return data.nome.toLowerCase().includes(filter);
      };
    } else {
      // Se o valor de filtro estiver vazio, mostre todos os dados
      this.dataSource.filterPredicate = () => true;
    }
  
    // Atualize a lista de departamentos
    this.updateUserList();
  }
  addFornecedor(): void {
    this.userService.SetActionRequired('Add');
    this.openModal();
  }

  editFornecedor(fornecedor: Fornecedor): void {
    this.userService.SetActionRequired('Edit');
    this.userService.SetFornecedorEdition(fornecedor);
    this.openModal();
  }

  async removeFornecedor(fornecedor: Fornecedor): Promise<void> {
    if (!fornecedor.status) {
      this.alreadyDeleted();
    } else {
      const confirmed = await this.confirmDelete();
      if (confirmed) {
        this.userService.DeleteFornecedor(fornecedor).subscribe(
          () => {
            this.GetFornecedores();
            this.showSuccessMessage();
          },
          (error) => {
            console.error('Erro ao deletar Fornecedor:', error);
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
    this.dataSource.data = this.fornecedores;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
