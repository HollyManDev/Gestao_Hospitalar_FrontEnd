import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Medicamento } from 'src/app/Models/Medicamento';
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';
import { MedicamentoCrudTemplateComponent } from '../../MedicoCrud/medicamento-crud-template/medicamento-crud-template.component';
import { Fornecedor } from 'src/app/Models/Fornecedor';

@Component({
  selector: 'app-medicamento-view-template',
  templateUrl: './medicamento-view-template.component.html',
  styleUrls: ['./medicamento-view-template.component.scss']
})
export class MedicamentoViewTemplateComponent implements OnInit {
  
  medicamentos: Medicamento[] = [];
  fornecedor: Fornecedor[] = [];
  dataSource: MatTableDataSource<Medicamento> = new MatTableDataSource<Medicamento>([]);
  displayedColumns: string[] = ['Id', 'Nome', 'Quantidade', 'DataValidade', 'Fornecedor', 'Edit', 'Remove'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.GetMedicamentos();
    this.GetFornecedores();
  }

  GetMedicamentos(): void {
    this.userService.GetMedicamentos().subscribe(userData => {
      if (userData.data) {
        this.medicamentos = userData.data;
        console.log('',this.medicamentos)
        this.updateUserList();
      }
    });
  }

  GetFornecedores(): void {
    this.userService.GetFornecedores().subscribe(userData => {
      if (userData.data) {
        this.fornecedor = userData.data;
      }
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(MedicamentoCrudTemplateComponent, {
      height: '490px',
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updateUserList();
    });
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim().toLowerCase();

    // Define o filtro do MatTableDataSource
    this.dataSource.filter = value;

    // Se o filtro não estiver vazio, faz o filtro
    if (value) {
      this.dataSource.filterPredicate = (data: Medicamento, filter: string) => {
        return data.nome.toLowerCase().includes(filter);
      };
    } else {
      // Se o valor de filtro estiver vazio, mostra todos os dados
      this.dataSource.filterPredicate = () => true;
    }
    
    // Atualiza a lista de medicamentos
    this.updateUserList();
  }

  getFornecedorName(fornecedorId: number): string {  
    const fornecedor = this.fornecedor.find(f => f.fornecedorID === fornecedorId);
    return fornecedor ? fornecedor.nome : 'Fornecedor Desconhecido';
  }

  addMedicamento(): void {
    this.userService.SetActionRequired('Add');
    this.openModal();
  }

  editMedicamento(medicamento: Medicamento): void {
    this.userService.SetActionRequired('Edit');
    this.userService.SetMedicamentoEdition(medicamento);
    this.openModal();
  }

  async removeMedicamento(medicamento: Medicamento): Promise<void> {
    const confirmed = await this.confirmDelete();
    if (confirmed) {
      this.userService.DeleteMedicamento(medicamento).subscribe(
        () => {
          this.GetMedicamentos(); // Atualiza a lista de medicamentos
          this.showSuccessMessage();
        },
        (error) => {
          console.error('Error deleting Medicamento:', error);
        }
      );
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
    this.dataSource.data = this.medicamentos; // Atualiza os dados da tabela
    if (this.paginator) {
      this.dataSource.paginator = this.paginator; // Conecta o paginator ao dataSource
    }
  }
}
