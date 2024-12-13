import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Outros } from 'src/app/Models/Outros';
import { Produto } from 'src/app/Models/Produto';
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produtos-crud-template',
  templateUrl: './produtos-crud-template.component.html',
  styleUrls: ['./produtos-crud-template.component.scss']
})
export class ProdutosCrudTemplateComponent {
  produtoForm!: FormGroup;
  allRequired: Outros[] = [];
  familias: Outros[] = [];
  subfamilias: Outros[] = [];
  unidadeEntrada: Outros[] = [];
  unidadeSaida: Outros[] = [];
  typeButton: string = '';
  action: string = '';
  produtoEdition!: Produto;
  familiaId: number = 0;
  uniSaidaId: number = 0;
  subFamiliaId: number = 0;
  uniEntradaId: number = 0;

  constructor(private userService: UserServiceService, private dialogRef: MatDialogRef<ProdutosCrudTemplateComponent>) {}

  ngOnInit(): void {
    this.action = this.userService.GetActionRequired();
    this.produtoEdition = this.userService.GetProdutoEdition();
    this.initializeForm();
    this. getAll_InfoRequired();
  
  }

  initializeForm(): void {
    this.produtoForm = new FormGroup({
      descricao: new FormControl(this.produtoEdition?.descricao || '', [Validators.required]),
      familia: new FormControl(this.getFamiliaName(this.produtoEdition?.familia)|| '', [Validators.required]),
      subfamilia: new FormControl(this.getSubFamiliaName(this.produtoEdition?.subfamilia)|| '', [Validators.required]),
      unidadeEntrada: new FormControl(this.getUnidadeEntradaName(this.produtoEdition?.unidadeEntrada) || '', [Validators.required]),
      unidadeSaida: new FormControl(this.getUnidadeSaidaName(this.produtoEdition?.unidadeSaida) || '', [Validators.required])
    });
  }

  getFamiliaId(leito: Outros): void {
    this.familiaId = leito.id;
  }

  getFamiliaName(leitoId: number): string {
    const leito = this.familias.find(l => l.id === leitoId && l.type === 'familia');
    return leito ? leito.nome : 'Familia desconhecida!';
  }
  getSubFamiliaId(leito: Outros): void {
    this.familiaId = leito.id;
  }

  getSubFamiliaName(leitoId: number): string {
    const leito = this.subfamilias.find(l => l.id === leitoId  && l.type === 'subFamilia');
    return leito ? leito.nome : 'SubFamilia desconhecida!';
  }

  getUnidadeEntradaId(leito: Outros): void {
    this.familiaId = leito.id;
  }

  getUnidadeEntradaName(leitoId: number): string {
    const leito = this.unidadeEntrada.find(l => l.id === leitoId  && l.type === 'unidadeEntrada');
    return leito ? leito.nome : 'Unidade de Entrada desconhecida!';
  }

  getUnidadeSaidaId(leito: Outros): void {
    this.uniSaidaId = leito.id;
  }

  getUnidadeSaidaName(leitoId: number): string {
    const leito = this.unidadeSaida.find(l => l.id === leitoId  && l.type === 'unidadeSaida');
    return leito ? leito.nome : 'Unidade de Entrada desconhecida!';
  }

  getAll_InfoRequired(): void {
    this.userService.GetOutros().subscribe(data => {
      this.allRequired = data.data;
      this.familias = this.allRequired.filter(f => f.type === 'familia');
      this.subfamilias = this.allRequired.filter(sbf => sbf.type === 'subFamilia');
      this.unidadeEntrada = this.allRequired.filter(ue => ue.type === 'unidadeEntrada');
      this.unidadeSaida = this.allRequired.filter(us => us.type === 'unidadeSaida');
    });
  }

  submit(): void {
    if (this.produtoForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Preencha todos os campos obrigatórios!',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }

    const produtoData: Produto = this.produtoForm.value;
    if (this.produtoEdition && this.action === 'Edit'){
      produtoData.referencia = this.produtoEdition.referencia; // Mantém a referência se for edição
      this.handleUpdateProduto(produtoData);
    } else {
      this.handleCreateProduto(produtoData);
    }
  }

  handleCreateProduto(produtoData: Produto): void {
    this.userService.CreateProduto(produtoData).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Produto criado com sucesso!',
        showConfirmButton: false,
        timer: 2000
      });
    });
  }

  handleUpdateProduto(produtoData: Produto): void {
    this.userService.UpdateProduto(produtoData).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Produto atualizado com sucesso!',
        showConfirmButton: false,
        timer: 2000
      });
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
