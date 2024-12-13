import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Produto } from 'src/app/Models/Produto';
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';
import { ProdutosCrudTemplateComponent} from '../../ProdutosCrud/produtos-crud-template/produtos-crud-template.component';
import { Outros } from 'src/app/Models/Outros';
@Component({
  selector: 'app-produtos-view-template',
  templateUrl: './produtos-view-template.component.html',
  styleUrls: ['./produtos-view-template.component.scss']
})
export class ProdutosViewTemplateComponent {
  produtos: Produto[] = [];  // Lista de produtos
  familia: Outros[] = []; 
  subFamilia: Outros[] = [];
  unidadeEntrada: Outros[] = []; 
  unidadeSaida: Outros[] = [];  
  dataSource: MatTableDataSource<Produto> = new MatTableDataSource<Produto>([]);
  displayedColumns: string[] = ['Referencia', 'Descricao', 'Familia', 'Subfamilia', 'UnidadeEntrada', 'UnidadeSaida', 'Edit', 'Remove'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.GetProdutos();
    this.updateProductList();
  }

  // Obter todos os produtos
  GetProdutos(): void {
    this.userService.GetProdutos().subscribe(userData => {
      if (userData.data) {
        this.produtos = userData.data;
        this.updateProductList();
      }
    });
  }

  // Abrir o modal para adicionar/editar produto
  openModal(): void {
    const dialogRef = this.dialog.open(ProdutosCrudTemplateComponent, {
      height: '590px',
      width: '30%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal foi fechado. Resultado:', result);
      this.updateProductList();
    });
  }

  // Função de pesquisa
  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim().toLowerCase();
  
    this.dataSource.filter = value;
  
    if (value) {
      this.dataSource.filterPredicate = (data: Produto, filter: string) => {
        return data.descricao.toLowerCase().includes(filter);
      };
    } else {
      this.dataSource.filterPredicate = () => true;
    }

    this.updateProductList();
  }

  
  getFamiliaName(leitoId: number): string {  
    const leitoName = this.familia.find(l => l.id === leitoId && l.type === 'familia');
    return leitoName ? leitoName.nome : 'Produto sem familia';
  }  
  getSubFamiliaName(leitoId: number): string {  
    const leitoName = this.subFamilia.find(l => l.id === leitoId && l.type === 'subFamilia');
    return leitoName ? leitoName.nome : 'Produto sem sub Familia';
  }  
  getUnidadeEntrada(leitoId: number): string {  
    const leitoName = this.unidadeEntrada.find(l => l.id === leitoId && l.type === 'unidadeEntrada' );
    return leitoName ? leitoName.nome : 'Produto sem UnidadeEntrada';
  }  
  getUnidadeSaida(leitoId: number): string {  
    const leitoName = this.unidadeSaida.find(l => l.id === leitoId && l.type === 'unidadeSaida' );
    return leitoName ? leitoName.nome : 'Produto sem Unidade Saida';
  }  

  // Adicionar novo produto
  addProduto(): void {
    this.userService.SetActionRequired('Add');
    this.openModal();
  }

  // Editar um produto
  editProduto(produto: Produto): void {
    this.userService.SetActionRequired('Edit');
    this.userService.SetProdutoEdition(produto);
    this.openModal();
  }

  // Remover um produto
  async removeProduto(produto: Produto): Promise<void> {
    const confirmed = await this.confirmDelete();
    if (confirmed) {
      this.userService.DeleteProduto(produto).subscribe(
        (response) => {
          this.userService.GetProdutos().subscribe(userData => {
            if (userData.data) {
              this.produtos = userData.data;
              this.updateProductList();
            }
          });
          this.router.navigate(['/InicioAdmin/Produto']);
          this.showSuccessMessage('Produto removido com sucesso!');
        },
        (error) => {
          console.error('Erro ao deletar produto:', error);
        }
      );
    }
  }

  // Exibir mensagem de sucesso
  showSuccessMessage(message: string): void {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 2000
    });
  }

  // Exibir mensagem de erro
  showErrorMessage(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: message,
      showConfirmButton: false,
      timer: 3000
    });
  }

  // Confirmar a exclusão de um produto
  confirmDelete(): Promise<boolean> {
    return Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá recuperar este produto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!'
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  // Atualizar a lista de produtos
  updateProductList(): void {
    this.dataSource.data = this.produtos; // Atualiza os dados da tabela
    if (this.paginator) {
      this.dataSource.paginator = this.paginator; // Conecta o paginator ao dataSource
    }
  }
}
