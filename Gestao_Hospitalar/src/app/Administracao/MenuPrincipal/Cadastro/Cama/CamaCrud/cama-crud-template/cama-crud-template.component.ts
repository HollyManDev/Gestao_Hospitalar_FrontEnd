import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Cama } from 'src/app/Models/Cama';
import { Leito } from 'src/app/Models/Leito';
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cama-crud-template',
  templateUrl: './cama-crud-template.component.html',
  styleUrls: ['./cama-crud-template.component.scss']
})
export class CamaCrudTemplateComponent {

  action: string = '';
  camaEdition!: Cama;
  camaForm!: FormGroup;
  typeButton: string = '';
  leitos: Leito[] = [];  
  leitoId!: number;
  leitoName: string = '';
  constructor(
    private dialogRef: MatDialogRef<CamaCrudTemplateComponent>,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {

    this.GetLeitos();
    this.action = this.userService.GetActionRequired();
    this.camaEdition = this.userService.GetCamaEdition();
   
  }

  
  GetLeitos(): void {
    this.userService.GetLeitos().subscribe(userData => {
      if (userData.data) {
        this.leitos = userData.data;
        
        if(this.camaEdition && this.leitos.length > 0){
          this.leitoName = this.getLeitoName(this.camaEdition.leitoID);
        }
    
        if (this.action === 'Edit') {
          this.typeButton = 'Save'; 
          this.camaForm = new FormGroup({
            descricao: new FormControl(this.camaEdition.descricao, [Validators.required]),
            leito: new FormControl(this.leitoName, [Validators.required]),
          });
        } else {
          this.typeButton = 'Add';
          this.initializeForm();
        }

      }

    });
  }
  initializeForm(): void {
    this.camaForm = new FormGroup({
      descricao: new FormControl('', [Validators.required]),
    });
  }

  getLeitoId(leito: Leito): void{
       
       this.leitoId = leito.leitoID;
       
  }

  getLeitoName(leitoId: number): string {  

    const leitoName = this.leitos.find(l => l.leitoID === leitoId);
    return leitoName ? leitoName.descricao : 'Unknown Leito';

  }

  submit() {
    if (this.camaForm.valid) {
      const camaData: Cama = this.camaForm.value;
      camaData.status = true;
    

      if (this.action === 'Edit') {
        camaData.camaID = this.camaEdition.camaID;

             if(camaData.descricao === this.camaEdition.descricao && camaData.leitoID === this.leitoId){
                        
              this.showErrorMessage('Cannot update, make sure you have changed one place at least!',);
             }else{
               
              camaData.leitoID = this.leitoId;
        this.userService.UpdateCama(camaData).subscribe(
          (response) => {
            this.showSuccessMessage('Bed updated successfully!');
            this.dialogRef.close(true);
            location.reload();
          },
          (error) => {
            console.error('Error updating Bed:', error);
          }
        );
             }
      } else {
        camaData.leitoID = this.leitoId;
        this.userService.CreateCama(camaData).subscribe(
          (response) => {
            this.showSuccessMessage('Cama created successfully!');
            this.dialogRef.close(true);
            location.reload();
          },
          (error) => {
            console.error('Error creating Cama:', error);
          }
        );
      }
    } else {
      this.showErrorMessage('Please fill out all required fields.');
      this.camaForm.markAllAsTouched();
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
