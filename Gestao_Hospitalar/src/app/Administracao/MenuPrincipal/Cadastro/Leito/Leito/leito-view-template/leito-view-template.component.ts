import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { UserServiceService } from 'src/app/Service/user-service.service';
import { Leito } from 'src/app/Models/Leito';
import { LeitoCrutTemplateComponent } from '../../LeitoCrud/leito-crut-template/leito-crut-template.component';

@Component({
  selector: 'app-leito-view-template',
  templateUrl: './leito-view-template.component.html',
  styleUrls: ['./leito-view-template.component.scss']
})
export class LeitoViewTemplateComponent implements OnInit {
  leitos: Leito[] = [];
  dataSource: MatTableDataSource<Leito> = new MatTableDataSource<Leito>([]);
  displayedColumns: string[] = ['Id', 'Descricao', 'Status', 'Edit', 'Remove'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.GetLeitos();
  }

  GetLeitos(): void {
    this.userService.GetLeitos().subscribe(userData => {
      if (userData.data) {
        this.leitos = userData.data;
        this.updateUserList();
      }
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(LeitoCrutTemplateComponent, {
      height: '210px',
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
      this.dataSource.filterPredicate = (data: Leito, filter: string) => {
        return data.descricao.toLowerCase().includes(filter);
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

  editLeito(leito: Leito): void {
    this.userService.SetActionRequired('Edit');
    this.userService.SetLeitoEdition(leito);
    this.openModal();
  }

  async removeLeito(leito: Leito): Promise<void> {
    const confirmed = await this.confirmDelete();
    if (confirmed) {
      this.userService.DeleteLeito(leito).subscribe(
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

  showSuccessMessage(message: string): void {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 2000,
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
    this.dataSource.data = this.leitos;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
