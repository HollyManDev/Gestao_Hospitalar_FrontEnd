import { Component, ViewChild } from '@angular/core';
import { Cama } from 'src/app/Models/Cama';
import Swal from 'sweetalert2';
import { CamaCrudTemplateComponent } from '../../CamaCrud/cama-crud-template/cama-crud-template.component';
import { UserServiceService } from 'src/app/Service/user-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Leito } from 'src/app/Models/Leito';

@Component({
  selector: 'app-cama-view-template',
  templateUrl: './cama-view-template.component.html',
  styleUrls: ['./cama-view-template.component.scss']
})
export class CamaViewTemplateComponent {
 camas:Cama[] = [];
 leito:Leito[] = [];
  dataSource: MatTableDataSource<Cama> = new MatTableDataSource<Cama>([]);
  displayedColumns: string[] = ['Id', 'Quarto', 'Cama', 'Status', 'Alocar', 'Edit', 'Remove'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
   
    this.GetCamas();
    this.GetLeitos();
    this.updateUserList();
  }

 GetCamas(): void {
  this.userService.GetCamas().subscribe(userData => {
    
    if(userData.data){
      this.camas = userData.data;
      this.updateUserList();
    }

  });
  }
  GetLeitos(): void {
    this.userService.GetLeitos().subscribe(userData => {
      if (userData.data) {
        this.leito = userData.data;
        
      }
    });
  }
  openModal(): void {
    const dialogRef = this.dialog.open(CamaCrudTemplateComponent, {
      height: '300px',
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

      this.dataSource.filterPredicate = (data:Cama, filter: string) => {
        return data.descricao.toLowerCase().includes(filter);
      };
    } else {
      // Se o valor de filtro estiver vazio, mostre todos os dados
      this.dataSource.filterPredicate = () => true;
    }
  
    // Atualize a lista de departamentos
    this.updateUserList();
  }

  getLeitoName(leitoId: number): string {  
    const leitoName = this.leito.find(l => l.leitoID === leitoId);
    return leitoName ? leitoName.descricao : 'A cama está sem alocação';
  }  

  addDep(): void {
    this.userService.SetActionRequired('Add');
    this.openModal();
  }
  

  editCama(cama: Cama): void {
       if(cama.status){
        this.userService.SetActionRequired('Edit');
        this.userService.SetCamaEdition(cama);
        this.openModal();
       }
       else{
        this.showErrorMessage('Informacao da cama esta indisponivel para edicoes!');
       }
  }

  alocarCama(cama: Cama): void {
    if(cama.status){
      this.userService.SetActionRequired('Alocar');
      this.userService.SetCamaEdition(cama);
      this.openModal();
     }
     else{
      this.showErrorMessage('Informacao da cama esta indisponivel para edicoes!');
     }
  }
  
  desalocarCama(cama: Cama): void {
    //Lógica para desalocar a cama (remover associação com o leito)
    cama.leitoID = undefined;
    this.userService.UpdateCama(cama).subscribe(() => {
      this.updateUserList();
      this.showSuccessMessage('Cama desalocada com sucesso!');
    });
  }
  
  async removeCama(cama: Cama): Promise<void> {
    if (!cama.status) {
      this.alreadyDeleted();
    } else {
      const confirmed = await this.confirmDelete();
      if (confirmed) {
      
     
        this.userService.DeleteCama(cama).subscribe(
          (response) => {
          
            this.userService.GetCamas().subscribe(userData => {
             
              if(userData.data){
                this.camas = userData.data;
                this.updateUserList();
              }
            });
            this.router.navigate(['/InicioAdmin/Cama']);
            this.showSuccessMessage('Data Deleted Successfully');
          },
          (error) => {
            console.error('Erro ao deletar Esp[ecialidades]:', error);
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
    this.dataSource.data = this.camas; // Atualiza os dados da tabela
    if (this.paginator) {
      this.dataSource.paginator = this.paginator; // Conecta o paginator ao dataSource
    }
  }
}
