import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Funcionario } from 'src/app/Models/Funcionario';
import { FuncCrudTemplateComponent } from '../../FuncionarioCrud/funcionario-crud-template/funcionario-crud-template.component';
import { UserServiceService } from 'src/app/Service/user-service.service';

@Component({
  selector: 'app-funcionario-view-template',
  templateUrl: './funcionario-view-template.component.html',
  styleUrls: ['./funcionario-view-template.component.scss']
})
export class FuncionarioViewTemplateComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  dataSource: MatTableDataSource<Funcionario> = new MatTableDataSource<Funcionario>([]);
  displayedColumns: string[] = ['funcionarioID', 'nome', 'cargo', 'telefone', 'email', 'endereco', 'dataContratacao', 'status', 'departamentoID', 'cargoID', 'edit', 'remove'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.GetFuncionarios();
    this.updateUserList();
  }

  GetFuncionarios(): void {
    this.userService.GetFuncionarios().subscribe(userData => {
      if (userData.data) {
        this.funcionarios = userData.data;
        this.updateUserList();
      }
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(FuncCrudTemplateComponent, {
      height: '680px',
      width: '30%',
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

    this.dataSource.filter = value;

    if (value) {
      this.dataSource.filterPredicate = (data: Funcionario, filter: string) => {
        return data.nome.toLowerCase().includes(filter);
      };
    } else {
      this.dataSource.filterPredicate = () => true;
    }

    this.updateUserList();
  }

  addFunc(): void {
    this.userService.SetActionRequired('Add');
    this.openModal();
  }

  editFuncionarios(func: Funcionario): void {
    if (func.status) {
      this.userService.SetActionRequired('Edit');
      this.userService.SetFuncionarioEdition(func);
      this.openModal();
    } else {
      this.showErrorMessage('Informação Indisponível para Edição!');
    }
  }

  async removeFuncionarios(func: Funcionario): Promise<void> {
    if (!func.status) {
      this.alreadyDeleted();
    } else {
      const confirmed = await this.confirmDelete();
      if (confirmed) {
        this.userService.DeleteFuncionario(func).subscribe(
          (response) => {
            this.userService.GetFuncionarios().subscribe(userData => {
              if (userData.data) {
                this.funcionarios = userData.data;
                this.updateUserList();
              }
            });
            this.router.navigate(['/InicioAdmin/Funcionario']);
            this.showSuccessMessage();
          },
          (error) => {
            console.error('Erro ao deletar Funcionarios:', error);
          }
        );
      }
    }
  }

  showSuccessMessage(): void {
    Swal.fire({
      icon: 'success',
      title: 'Dados Deletados com Sucesso',
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
      title: 'Não é possível deletar, já está indisponível!',
      showConfirmButton: false,
      timer: 2000
    });
  }

  confirmDelete(): Promise<boolean> {
    return Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você não poderá recuperar esses dados!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, delete!'
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  updateUserList(): void {
    this.dataSource.data = this.funcionarios; 
    if (this.paginator) {
      this.dataSource.paginator = this.paginator; 
    }
  }
}
