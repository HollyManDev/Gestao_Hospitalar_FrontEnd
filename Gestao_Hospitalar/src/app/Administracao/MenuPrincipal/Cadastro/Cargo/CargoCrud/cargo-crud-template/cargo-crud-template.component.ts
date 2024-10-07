import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Cargo } from 'src/app/Models/Cargo';
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargo-crud-template',
  templateUrl: './cargo-crud-template.component.html',
  styleUrls: ['./cargo-crud-template.component.scss']
})
export class CargoCrudTemplateComponent {
  action: string = '';
  cargoEdition!: Cargo;
  cargoForm!: FormGroup;
  typeButton: string = '';

  constructor(
    private dialogRef: MatDialogRef<CargoCrudTemplateComponent>,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.action = this.userService.GetActionRequired();
    this.cargoEdition = this.userService.GetCargoEdition();

    if (this.action === 'Edit') {
      this.typeButton = 'Save';
      this.cargoForm = new FormGroup({
        descricao: new FormControl(this.cargoEdition.descricao, [Validators.required]),
      });
    } else {
      this.typeButton = 'Add';
      this.initializeForm();
    }
  }

  initializeForm(): void {
    this.cargoForm = new FormGroup({
      descricao: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    if (this.cargoForm.valid) {
      const cargoData: Cargo = this.cargoForm.value;
      cargoData.status = true;

      if (this.action === 'Edit') {
        cargoData.cargoID = this.cargoEdition.cargoID;

             if(cargoData.descricao === this.cargoEdition.descricao){
                        
              this.showErrorMessage('Cannot update, make sure you have changed one place at least!',);
             }else{
               
                 
        this.userService.UpdateCargo(cargoData).subscribe(
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
        this.userService.CreateCargo(cargoData).subscribe(
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
      this.cargoForm.markAllAsTouched();
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
