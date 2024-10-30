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
  isInputEnabled: boolean = true;
  constructor(
    private dialogRef: MatDialogRef<CamaCrudTemplateComponent>,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.action = this.userService.GetActionRequired();
    this.camaEdition = this.userService.GetCamaEdition();
    this.initializeForm();
    this.GetLeitos();
  }

  initializeForm(): void {
   
    if(this.camaEdition.leitoID){
      this.camaForm = new FormGroup({
        descricao: new FormControl(this.camaEdition?.descricao || '', [Validators.required]),
        leito: new FormControl(this.getLeitoName(this.camaEdition?.leitoID), [Validators.required])
      });
    }else{
       
      
      this.camaForm = new FormGroup({
        descricao: new FormControl(this.camaEdition?.descricao || '', [Validators.required]),
        leito: new FormControl('', [Validators.required])
      });
    }

    this.typeButton = this.action === 'Edit' ? 'Save' : this.action === 'Add' ? 'Add' : 'Save';
  }

// initializeForm(): void {
//     // Cria os controles do formulário
//     const descricaoControl: FormControl = new FormControl(
//       this.camaEdition?.descricao || '', 
//       [Validators.required]
//     );
  
//     let leitoControl: FormControl;
  
//     // Verifica se leitoID está presente
//     if (this.camaEdition && this.camaEdition.leitoID) {
//       leitoControl = new FormControl(this.getLeitoName(this.camaEdition.leitoID), [Validators.required]);
//       // Desabilita o controle de descrição se estiver editando uma cama existente
//       descricaoControl.disable();
//     } else {
//       leitoControl = new FormControl('', [Validators.required]);
//     }
  
//     // Criação do FormGroup
//     this.camaForm = new FormGroup({
//       descricao: descricaoControl, // Control habilitado ou desabilitado
//       leito: leitoControl // Control sempre habilitado
//     });
  
//     // Define o tipo do botão
//     this.typeButton = this.action === 'Edit' ? 'Save' : this.action === 'Add' ? 'Add' : 'Save';
//   }
  
  GetLeitos(): void {
    this.userService.GetLeitos().subscribe(userData => {
      if (userData.data) {
        this.leitos = userData.data;
        if (this.camaEdition?.leitoID) {
          this.camaForm.controls['leito'].setValue(this.getLeitoName(this.camaEdition.leitoID));
        }
      }
    });
  }

  getLeitoId(leito: Leito): void {
    this.leitoId = leito.leitoID;
  }

  getLeitoName(leitoId: number): string {
    const leito = this.leitos.find(l => l.leitoID === leitoId);
    return leito ? leito.descricao : 'Unknown Leito';
  }

  submit() {
    if (this.camaForm.invalid) {
      this.showErrorMessage('Please fill out all required fields.');
      this.camaForm.markAllAsTouched();
      return;
    }

    const camaData: Cama = { ...this.camaForm.value, status: true };
    if (this.leitoId){
      camaData.leitoID = this.leitoId;

    } 
    if (this.action === 'Edit') {
      camaData.camaID = this.camaEdition.camaID;
      this.handleUpdateCama(camaData);
    } else if (this.action === 'Add') {
      this.handleCreateCama(camaData);
    } else if (this.action === 'Alocar') {
      alert('alocando')
      console.log('alocando', camaData)
      this.handleAlocarCama(camaData);
    }
  }

  handleUpdateCama(camaData: Cama) {
    if (this.isUnchanged(camaData)) {
      this.showErrorMessage('Cannot update, make sure you have changed at least one field!');
      return;
    }

    this.userService.UpdateCama(camaData).subscribe(
      () => this.showSuccessMessage('Bed updated successfully!'),
      (error) => console.error('Error updating Bed:', error)
    );
    this.dialogRef.close(true);
    location.reload();
  }

  handleCreateCama(camaData: Cama) {
    this.userService.CreateCama(camaData).subscribe(
      () => {
        this.showSuccessMessage('Cama created successfully!');
        this.dialogRef.close(true);
        location.reload();
      },
      (error) => console.error('Error creating Cama:', error)
    );
  }

  handleAlocarCama(camaData: Cama) {
   
    camaData.camaID = this.camaEdition.camaID;
    camaData.leitoID = this.leitoId
    this.userService.UpdateCama(camaData).subscribe(
      () => this.showSuccessMessage('Cama Alocada com Sucesso!'),
      (error) => console.error('Error allocating Bed:', error)
     
    );
    this.dialogRef.close(true);
      location.reload();
  }

  isUnchanged(camaData: Cama): boolean {
    return camaData.descricao === this.camaEdition.descricao && camaData.leitoID === this.camaEdition.leitoID;
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
