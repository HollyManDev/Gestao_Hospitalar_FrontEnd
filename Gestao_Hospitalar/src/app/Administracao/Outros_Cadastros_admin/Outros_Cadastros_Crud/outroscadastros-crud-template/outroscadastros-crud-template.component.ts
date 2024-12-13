import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Outros } from 'src/app/Models/Outros';
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-outroscadastros-crud-template',
  templateUrl: './outroscadastros-crud-template.component.html',
  styleUrls: ['./outroscadastros-crud-template.component.scss']
})
export class OutroscadastrosCrudTemplateComponent {
  action: string = '';
  outroEdition!: Outros;
  outrosForm!: FormGroup;
  typeButton: string = '';

  constructor(
    private dialogRef: MatDialogRef<OutroscadastrosCrudTemplateComponent>,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.action = this.userService.GetActionRequired();
    this.outroEdition = this.userService.GetOutroEdition();

    if (this.action === 'Edit') {
      this.typeButton = 'Save';
      this.outrosForm = new FormGroup({
       descricao: new FormControl(this.outroEdition.nome, [Validators.required]),
       categoria: new FormControl(this.outroEdition.type, [Validators.required]),
      });
    } else {
      this.typeButton = 'Add';
      this.initializeForm();
    }
  }

  initializeForm(): void {
    this.outrosForm = new FormGroup({
      descricao: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required])
    });
  }

  submit() {
    if (this.outrosForm.valid) {
      const outrosData: Outros = this.outrosForm.value;
      outrosData.status = true;
   

      if (this.action === 'Edit') {
        outrosData.id = this.outroEdition.id;

             if(outrosData.nome === this.outroEdition.nome){
                        
              this.showErrorMessage('Cannot update, make sure you have changed one place at least!',);
             }else{
               
                 
        this.userService.UpdateOutro(outrosData).subscribe(
          (response) => {
            this.showSuccessMessage('Cargo updated successfully!');
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error updating Cargo:', error);
          }
        );
             }
      } else {
        alert('antes de salvar')
            console.log(outrosData)
        this.userService.CreateOutro(outrosData).subscribe(
          (response) => {
            this.showSuccessMessage('Cargo created successfully!');
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error creating Cargo:', error);
          }
        );
      }
    } else {
      this.showErrorMessage('Please fill out all required fields.');
      this.outrosForm.markAllAsTouched();
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
