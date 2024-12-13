import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Medicamento } from 'src/app/Models/Medicamento';
import { Fornecedor } from 'src/app/Models/Fornecedor'; // Importando a interface do Fornecedor
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';
import { Produto } from 'src/app/Models/Produto';

@Component({
  selector: 'app-medicamento-crud-template',
  templateUrl: './medicamento-crud-template.component.html',
  styleUrls: ['./medicamento-crud-template.component.scss']
})
export class MedicamentoCrudTemplateComponent implements OnInit {

  action: string = '';
  medicamentoEdition!: Medicamento;
  medicamentoForm!: FormGroup;
  typeButton: string = '';
  fornecedores: Fornecedor[] = [];
  fornecedorId!: number;
  produtos: Produto[] = [];
  produtoId!: number;
  entidades: Produto[] = [];
  entidadeId!: number;
  centrodeCusto: Produto[] = [];
  centrodeCustoId!: number;
  fornecedorName: string = '';

  constructor(
    private dialogRef: MatDialogRef<MedicamentoCrudTemplateComponent>,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.medicamentoEdition = this.userService.GetMedicamentoEdition();
    this.initializeForm();
    this.GetFornecedores();
    this.action = this.userService.GetActionRequired();
  }

  GetFornecedores(): void {
    this.userService.GetFornecedores().subscribe(userData => {
      if (userData.data) {
        this.fornecedores = userData.data;

        if (this.action === 'Edit') {
          this.typeButton = 'Save';

          this.fornecedorName = this.getFornecedorName(this.medicamentoEdition.fornecedorID);

          this.medicamentoForm = new FormGroup({
            produto: new FormControl(this.medicamentoEdition.produto, [Validators.required]),
            quantidade: new FormControl(this.medicamentoEdition.quantidade, [Validators.required]),
            dataEmissao: new FormControl(this.medicamentoEdition.dataEmissao, [Validators.required]),
            dataValidade: new FormControl(this.medicamentoEdition.dataValidade, [Validators.required]),
            lote: new FormControl(this.medicamentoEdition.lote, [Validators.required]),
            centroDeCusto: new FormControl(this.medicamentoEdition.centroDeCusto, [Validators.required]),
            fornecedor: new FormControl(this.fornecedorName, [Validators.required]),
          });
        } else {
          this.typeButton = 'Add';
          this.initializeForm();
        }
      }
    });
  }

  initializeForm(): void {
    this.medicamentoForm = new FormGroup({
      produto: new FormControl('', [Validators.required]),
      quantidade: new FormControl('', [Validators.required]),
      dataEmissao: new FormControl('', [Validators.required]),
      dataValidade: new FormControl('', [Validators.required]),
      lote: new FormControl('', [Validators.required]),
      centroDeCusto: new FormControl('', [Validators.required]),
      fornecedor: new FormControl('', [Validators.required]),
    });
  }

  getFornecedorId(forn: Fornecedor): void {
    this.fornecedorId = forn.fornecedorID;
  }

  getFornecedorName(fornId: number): string {
    const fornName = this.fornecedores.find(l => l.fornecedorID === fornId);
    return fornName ? fornName.nome : 'Unknown forn';
  }

  submit() {
    if (this.medicamentoForm.valid) {
      const medicamentoData: Medicamento = {
        ...this.medicamentoForm.value,
        fornecedorid: this.fornecedorId,
      };

      if (this.action === 'Edit') {
        medicamentoData.medicamentoID = this.medicamentoEdition.medicamentoID;

        if (
          medicamentoData.produto === this.medicamentoEdition.produto &&
          medicamentoData.quantidade === this.medicamentoEdition.quantidade &&
          medicamentoData.dataEmissao === this.medicamentoEdition.dataEmissao &&
          medicamentoData.dataValidade === this.medicamentoEdition.dataValidade &&
          medicamentoData.lote === this.medicamentoEdition.lote &&
          medicamentoData.centroDeCusto === this.medicamentoEdition.centroDeCusto 
         
        ) {
          this.showErrorMessage('Cannot update, make sure you have changed one field at least!');
        } else {
          medicamentoData.fornecedorID = this.medicamentoEdition.fornecedorID;
          medicamentoData.status = this.medicamentoEdition.status;

          this.userService.UpdateMedicamento(medicamentoData).subscribe(
            () => {
              this.showSuccessMessage('Medicamento updated successfully!');
              this.dialogRef.close(true);
              location.reload();
            },
            (error) => {
              console.error('Error updating Medicamento:', error);
            }
          );
        }
      } else {
        this.userService.CreateMedicamento(medicamentoData).subscribe(
          () => {
            this.showSuccessMessage('Medicamento created successfully!');
            this.dialogRef.close(true);
            location.reload();
          },
          (error) => {
            console.error('Error creating Medicamento:', error);
          }
        );
      }
    } else {
      this.showErrorMessage('Please fill out all required fields.');
      this.medicamentoForm.markAllAsTouched();
    }
  }

  Close(): void {
    this.dialogRef.close(false);
  }

  showSuccessMessage(message: string) {
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
      title: 'Error!',
      text: message,
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
