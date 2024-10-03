import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Equipamento } from 'src/app/Models/EquipamentoMedico';
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipamento-crud-template',
  templateUrl: './equipamento-crud-template.component.html',
  styleUrls: ['./equipamento-crud-template.component.scss']
})
export class EquipamentoCrudTemplateComponent {
  action: string = ''; 
  equipEdition!: Equipamento; 
  equipamentoForm!: FormGroup; 
  typeButton: string = '';
  equipamentos: Equipamento[] = [];

  constructor(
    private dialogRef: MatDialogRef<EquipamentoCrudTemplateComponent>,
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.GetEquipamentos().subscribe(equipData => {
      if (equipData.data) {
        this.equipamentos = equipData.data;
      }
    });

    this.action = this.userService.GetActionRequired();
    this.equipEdition = this.userService.GetEquipamentoEdition();

    if (this.action === 'Edit') {
      this.typeButton = 'Save';
      this.equipamentoForm = new FormGroup({
        nome: new FormControl(this.equipEdition.nome, [Validators.required]),
        dataAquisicao: new FormControl(this.equipEdition.dataAquisicao, [Validators.required]),
        localizacao: new FormControl(this.equipEdition.localizacao, [Validators.required]),
      });
    } else if (this.action === 'Add') {
      this.typeButton = 'Add';
      this.initializing();
    }
  }

  initializing(): void {
    this.equipamentoForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      dataAquisicao: new FormControl('', [Validators.required]),
      localizacao: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    if (this.equipamentoForm.valid) {
      const equipData: Equipamento = this.equipamentoForm.value;
      equipData.status = true;

      if (this.action === 'Edit' && this.typeButton === 'Save') {
        if (
          this.equipEdition.nome === equipData.nome &&
          this.equipEdition.dataAquisicao === equipData.dataAquisicao &&
          this.equipEdition.localizacao === equipData.localizacao
        ) {
          this.showWarnMessage();
        } else {
          equipData.equipamentoID = this.equipEdition.equipamentoID;
          this.userService.UpdateEquipamento(equipData).subscribe(
            (response) => {
              this.showSuccessMessage1();
              location.reload();
            },
            (error) => {
              console.error('Erro ao atualizar equipamento:', error);
            }
          );
        }
      } else if (this.action === 'Add' && this.typeButton === 'Add') {
        const exist = this.equipamentos.find(
          (equip) => equipData.nome.trim() === equip.nome.trim()
        );

        if (!exist) {
          this.userService.CreateEquipamento(equipData).subscribe(
            (response) => {
              this.showSuccessMessage();
              location.reload();
            },
            (error) => {
              console.error('Erro ao criar equipamento:', error);
            }
          );
        } else {
          this.showErrorExistMessage();
        }
      }
    } else {
      this.showErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      this.equipamentoForm.markAllAsTouched();
    }
  }

  Close(): void {
    this.dialogRef.close('true');
  }

  showSuccessMessage() {
    Swal.fire({
      icon: 'success',
      title: 'Equipamento salvo com sucesso',
      showConfirmButton: false,
      timer: 3000
    });
  }

  showSuccessMessage1() {
    Swal.fire({
      icon: 'success',
      title: 'Equipamento atualizado com sucesso',
      showConfirmButton: false,
      timer: 3000
    });
  }

  showWarnMessage() {
    Swal.fire({
      icon: 'warning',
      title: 'Nenhuma alteração detectada!',
      showConfirmButton: false,
      timer: 3000
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

  showErrorExistMessage() {
    Swal.fire({
      icon: 'error',
      title: 'Não é possível salvar, o equipamento já existe!',
      showConfirmButton: false,
      timer: 2000
    });
  }
}
