import { Component, ViewChild } from '@angular/core';
import { DeptCrudTemplateComponent } from '../../deptCrud/dept-crud-template/dept-crud-template.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Departamento } from 'src/app/Models/Departamento';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { UserServiceService } from 'src/app/Service/user-service.service';

@Component({
  selector: 'app-dept-view-template',
  templateUrl: './dept-view-template.component.html',
  styleUrls: ['./dept-view-template.component.scss']
})
export class DeptViewTemplateComponent {
  departamento: Departamento[] = [];
  dataSource: MatTableDataSource<Departamento> = new MatTableDataSource<Departamento>([]);
  displayedColumns: string[] = ['Id', 'Departamento', 'Descricao', 'Status', 'Edit', 'Remove'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
   
    this. GetDepartamento();
    this.updateUserList();
  }

  GetDepartamento(): void {
    this.userService.GetDepartamentos().subscribe(depData => {
      
      if(depData.data){
        this.departamento = depData.data;
      console.log(depData)
        this.updateUserList();
      }
  
    });
    }
  openModal(): void {
    const dialogRef = this.dialog.open(DeptCrudTemplateComponent, {
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
      this.dataSource.filterPredicate = (data: Departamento, filter: string) => {
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

  editDepartment(dept: Departamento): void {
      if(dept.status){
        this.userService.SetActionRequired('Edit');
        this.userService.SetDepartmentEdition(dept);
        this.openModal();
      }
      else{
        this.showErrorMessage('Informacao do departamento indisponivel para edicoes!');
      }
  }

  async removeDepartment(dept: Departamento): Promise<void> {
    if (!dept.status) {
      this.alreadyDeleted();
    } else {
      const confirmed = await this.confirmDelete();
      if (confirmed) {
        this.userService.DeleteDepartamento(dept).subscribe(
          (response) => {
          
            this.userService.GetDepartamentos().subscribe(deptData => {
             
              if(deptData.data){
                this.departamento = deptData.data;
                this.updateUserList();
              }
            });
            this.router.navigate(['/InicioAdmin/Departamento']);
            this.showSuccessMessage();
          },
          (error) => {
            console.error('Erro ao deletar Departamento:', error);
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
  showErrorMessage(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: message,
      showConfirmButton: false,
      timer: 3000
    });
  }
  updateUserList(): void {
    this.dataSource.data = this.departamento; // Atualiza os dados da tabela
    if (this.paginator) {
      this.dataSource.paginator = this.paginator; // Conecta o paginator ao dataSource
    }
  }

}
