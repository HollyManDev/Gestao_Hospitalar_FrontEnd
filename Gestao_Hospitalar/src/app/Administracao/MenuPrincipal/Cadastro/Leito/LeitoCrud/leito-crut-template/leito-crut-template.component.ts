import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Leito } from 'src/app/Models/Leito';
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leito-crut-template',
  templateUrl: './leito-crut-template.component.html',
  styleUrls: ['./leito-crut-template.component.scss']
})
export class LeitoCrutTemplateComponent {
  action: string = '';
  leitoEdition!: Leito;
  leitoForm!: FormGroup;
  typeButton: string = '';

  constructor(
    private dialogRef: MatDialogRef<LeitoCrutTemplateComponent>,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.action = this.userService.GetActionRequired();
    this.leitoEdition = this.userService.GetLeitoEdition();

    if (this.action === 'Edit') {
      this.typeButton = 'Save';
      this.leitoForm = new FormGroup({
        descricao: new FormControl(this.leitoEdition.descricao, [Validators.required]),
      });
    } else {
      this.typeButton = 'Add';
      this.initializeForm();
    }
  }

  initializeForm(): void {
    this.leitoForm = new FormGroup({
      descricao: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    if (this.leitoForm.valid) {
      const leitoData: Leito = this.leitoForm.value;
      leitoData.status = true;

      if (this.action === 'Edit') {
        leitoData.leitoID = this.leitoEdition.leitoID;

             if(leitoData.descricao === this.leitoEdition.descricao){
                        
              this.showErrorMessage('Cannot update, make sure you have changed one place at least!',);
             }else{
               
                 
        this.userService.UpdateLeito(leitoData).subscribe(
          (response) => {
            this.showSuccessMessage('Leito updated successfully!');
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error updating Leito:', error);
          }
        );
             }
      } else {
        this.userService.CreateLeito(leitoData).subscribe(
          (response) => {
            this.showSuccessMessage('Leito created successfully!');
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error creating Leito:', error);
          }
        );
      }
    } else {
      this.showErrorMessage('Please fill out all required fields.');
      this.leitoForm.markAllAsTouched();
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
