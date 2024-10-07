import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { UserServiceService } from 'src/app/Service/user-service.service';
import { Equipamento } from 'src/app/Models/EquipamentoMedico';
import { EquipamentoCrudTemplateComponent } from '../../EquipamentoCrud/equipamento-crud-template/equipamento-crud-template.component';

@Component({
  selector: 'app-equipamento-view-template',
  templateUrl: './equipamento-view-template.component.html',
  styleUrls: ['./equipamento-view-template.component.scss']
})
export class EquipamentoViewTemplateComponent {
  equipamentos: Equipamento[] = [];
  dataSource: MatTableDataSource<Equipamento> = new MatTableDataSource<Equipamento>([]);
  displayedColumns: string[] = ['Id', 'Nome', 'DataAquisicao', 'Localizacao', 'Status', 'Edit', 'Remove'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.GetEquipamentos();
    this.updateEquipamentoList();
  }

  GetEquipamentos(): void {
    this.userService.GetEquipamentos().subscribe(equipData => {
      if (equipData.data) {
        this.equipamentos = equipData.data;
        this.updateEquipamentoList();
      }
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(EquipamentoCrudTemplateComponent, {
      height: '400px',
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal foi fechado. Resultado:', result);
      this.updateEquipamentoList();
    });
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim().toLowerCase();

    this.dataSource.filter = value;

    if (value) {
      this.dataSource.filterPredicate = (data: Equipamento, filter: string) => {
        return data.nome.toLowerCase().includes(filter);
      };
    } else {
      this.dataSource.filterPredicate = () => true;
    }

    this.updateEquipamentoList();
  }

  addEquipamento(): void {
    this.userService.SetActionRequired('Add');
    this.openModal();
  }

  editEquipamento(equip: Equipamento): void {
    
      if(equip.status){
        this.userService.SetActionRequired('Edit');
        this.userService.SetEquipamentoEdition(equip);
        this.openModal();
      }
      else{
        this.showErrorMessage('Informacao Indisponivel para Edicao!');
      }
  }

  async removeEquipamento(equip: Equipamento): Promise<void> {
    if (!equip.status) {
      this.alreadyDeleted();
    } else {
      const confirmed = await this.confirmDelete();
      if (confirmed) {
        this.userService.DeleteEquipamento(equip).subscribe(
          (response) => {
            this.GetEquipamentos();
            this.router.navigate(['/InicioAdmin/Equipamento']);
            this.showSuccessMessage();
          },
          (error) => {
            console.error('Erro ao deletar equipamento:', error);
          }
        );
      }
    }
  }

  showSuccessMessage(): void {
    Swal.fire({
      icon: 'success',
      title: 'Equipamento deletado com sucesso',
      showConfirmButton: false,
      timer: 2000
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
      title: 'Tem certeza?',
      text: 'Você não poderá recuperar esses dados!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, delete!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  updateEquipamentoList(): void {
    this.dataSource.data = this.equipamentos;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
