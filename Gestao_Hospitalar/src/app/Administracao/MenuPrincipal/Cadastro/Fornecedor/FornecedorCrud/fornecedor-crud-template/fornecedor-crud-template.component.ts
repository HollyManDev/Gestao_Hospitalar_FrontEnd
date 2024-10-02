import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Fornecedor } from 'src/app/Models/Fornecedor';
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fornecedor-crud-template',
  templateUrl: './fornecedor-crud-template.component.html',
  styleUrls: ['./fornecedor-crud-template.component.scss']
})
export class FornecedorCrudTemplateComponent {
  action: string = ''; 
  fornecedorEdition!: Fornecedor; 
  fornecedorForm!: FormGroup; 
  typeButton: string = '';
  fornecedores: Fornecedor[] = [];

  constructor(
    private dialogRef: MatDialogRef<FornecedorCrudTemplateComponent>,
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.GetFornecedores().subscribe(userData => {
      if (userData.data) {
        this.fornecedores = userData.data;
      }
    });

    this.action = this.userService.GetActionRequired();
    this.fornecedorEdition = this.userService.GetFornecedorEdition();

    if (this.action === 'Edit') {
      this.typeButton = 'Save';
      this.fornecedorForm = new FormGroup({
        nome: new FormControl(this.fornecedorEdition.nome, [Validators.required]),
        nuit: new FormControl(this.fornecedorEdition.nuit, [Validators.required]),
        telefone: new FormControl(this.fornecedorEdition.telefone, [Validators.required]),
        email: new FormControl(this.fornecedorEdition.email, [Validators.required, Validators.email]),
      });
    } else if (this.action === 'Add') {
      this.typeButton = 'Add';
      this.initializing();
    }
  }

  initializing(): void {
    this.fornecedorForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      nuit: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  submit() {
    if (this.fornecedorForm.valid) {
      const fornecedorData: Fornecedor = this.fornecedorForm.value;
      fornecedorData.status = true;

      if (this.action === 'Edit' && this.typeButton === 'Save') {
        fornecedorData.fornecedorID = this.fornecedorEdition.fornecedorID;

             if( (this.fornecedorEdition.contato === fornecedorData.contato) &&
               (this.fornecedorEdition.email === fornecedorData.email) && 
               (this.fornecedorEdition.nome === fornecedorData.nome) &&
               (this.fornecedorEdition.nuit=== fornecedorData.nuit) &&
               (this.fornecedorEdition.telefone === fornecedorData.telefone) ){

                this.showErrorMessage('Nothing was changed, make sure you have changed a place at least');
               }
               else{
                this.userService.UpdateFornecedor(fornecedorData).subscribe(
                  (response) => {
                    
                    this.showSuccessMessage('Fornecedor Updated Successfully');
                    location.reload();
                  },
                  (error) => {
                    console.error('Erro ao Atualizar Fornecedor:', error);
                  }
                );
               
               }
      } else if (this.action === 'Add' && this.typeButton === 'Add') {
        let exist = this.fornecedores.find(f => fornecedorData.nuit.trim() === f.nuit.trim());
        if (!exist) {
          this.userService.CreateFornecedor(fornecedorData).subscribe(
            (response) => {
              this.showSuccessMessage('Fornecedor Saved Successfully');
              location.reload();
            },
            (error) => {
              console.error('Erro ao criar Fornecedor:', error);
            }
          );
        } else {
          this.showErrorExistMessage();
        }
      }
    } else {
      this.showErrorMessage('Please fill out all required fields.');
      this.fornecedorForm.markAllAsTouched();
    }
  }

  Close(): void {
    this.dialogRef.close(true);
  }

  showSuccessMessage(title: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 3000
    });
  }

  showErrorMessage(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: message,
      showConfirmButton: false,
      timer: 3000
    });
  }

  showErrorExistMessage() {
    Swal.fire({
      icon: 'error',
      title: 'Cannot save, it is already saved!',
      showConfirmButton: false,
      timer: 2000
    });
  }
}
