import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Especialidade } from 'src/app/Models/Especialidade';
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-espe-crud-template',
  templateUrl: './espe-crud-template.component.html',
  styleUrls: ['./espe-crud-template.component.scss']
})
export class EspeCrudTemplateComponent {
  action: string = ''; 
   espEdition!: Especialidade; 
   especialidadeForm!: FormGroup; 
   typeButton: string = '';
  especialidades: Especialidade [] = [];

  constructor( private dialogRef: MatDialogRef<EspeCrudTemplateComponent>,private userService: UserServiceService, private router: Router) {}

  ngOnInit(): void {
   
    this.userService.GetEspecialidades().subscribe(userData => {
    
      if(userData.data){
        this.especialidades = userData.data;
        // this.depart = this.depart.filter(dep => dep.status === true);
      }
    });

    this.action = this.userService.GetActionRequired();
    this.espEdition = this.userService.GetEspecialidadeEdition();

      if(this.action === 'Edit'){

        this.typeButton = 'Save'
        this. especialidadeForm = new FormGroup({
          nome: new FormControl(this.espEdition.nome, [Validators.required]),
          descricao: new FormControl(this.espEdition.descricao, [Validators.required]),
        });
    } else{
      
      if(this.action === 'Add'){
        
          this.typeButton = 'Add'
         this.initializing();
      
      }
    
    }  
        
  }

  initializing(): void{
    this. especialidadeForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
    });
  }
  
  submit() {

    if (this. especialidadeForm.valid) {

      const espData:  Especialidade = this. especialidadeForm.value;
                  
             espData.status = true;

              if(this.action === 'Edit' && this.typeButton === 'Save'){
                    
                if(this.espEdition.nome === espData.nome){
                      
                     this.showWarnMessage();
                }
                else{

                  //Passando o id do Departamento para actualizar
                  espData.especialidadeID = this.espEdition.especialidadeID;

                  this.userService.UpdateEspecialidade(espData).subscribe(
                    
                    (response) => {
                        
                      this.showSuccessMessage1();
                      
                      location.reload();

                    },
                    (error) => {

                      console.error('Erro ao Actualizar Especialidade:', error);

                    }
                  );
                }
              }
              else{
                if(this.action === 'Add' && this.typeButton === 'Add'){
                      
                  let exist = null;

                   exist = this.especialidades.find(esp => espData.nome.trim() === esp.nome.trim());
                   
                   if(exist === null || exist === undefined){
                        this.userService.CreateEspecialidade(espData).subscribe(
                        
                          (response) => {
                              
                            this.showSuccessMessage();
                            
                            location.reload();
      
                          },
                          (error) => {
      
                            console.error('Erro ao criar usuário:', error);
      
                          }
                        );
                   }
                   else{
                        this.showErrorExistMessage();
                   }
                
                }
              }
    } else {
      this.showErrorMessage('Please fill out all required fields.');
   
      this. especialidadeForm.markAllAsTouched();
    }
  }
  Close(): void{ 
    this.dialogRef.close('true');
  }
  showSuccessMessage() {
    Swal.fire({
      icon: 'success',
      title: 'Specialty Saved Successfully',
      showConfirmButton: false,
      timer: 3000 // 2 segundos
    });
  }

  showSuccessMessage1() {
    Swal.fire({
      icon: 'success',
      title: 'Specialty Updated Successfully',
      showConfirmButton: false,
      timer: 3000 // 2 segundos
    });
  }
 showWarnMessage() {
    Swal.fire({
      icon: 'warning',
      title: 'Cannot update, make sure you have changed one place at least!',
      showConfirmButton: false,
      timer: 3000 // 2 segundos
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
