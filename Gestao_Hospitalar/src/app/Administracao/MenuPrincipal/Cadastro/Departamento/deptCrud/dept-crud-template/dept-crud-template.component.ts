import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Departamento } from 'src/app/Models/Departamento';
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dept-crud-template',
  templateUrl: './dept-crud-template.component.html',
  styleUrls: ['./dept-crud-template.component.scss']
})
export class DeptCrudTemplateComponent {
  action: string = ''; 
  depEdition!: Departamento; 
  departamentoForm!: FormGroup; 
  typeButton: string = '';
departamentos: Departamento [] = [];

 constructor( private dialogRef: MatDialogRef<DeptCrudTemplateComponent>,private userService: UserServiceService, private router: Router) {}

 ngOnInit(): void {
  
   this.userService.GetDepartamentos().subscribe(userData => {
   
     if(userData.data){
       this.departamentos = userData.data;
       // this.depart = this.depart.filter(dep => dep.status === true);
     }
   });

   this.action = this.userService.GetActionRequired();
   this.depEdition = this.userService.GetDepartmentEdition();

     if(this.action === 'Edit'){

       this.typeButton = 'Save'
       this.departamentoForm = new FormGroup({
         nome: new FormControl(this.depEdition.nome, [Validators.required]),
         descricao: new FormControl(this.depEdition.descricao, [Validators.required]),
       });
   } else{
     
     if(this.action === 'Add'){
       
         this.typeButton = 'Add'
        this.initializing();
     
     }
   
   }  
       
 }

 initializing(): void{
   this. departamentoForm = new FormGroup({
     nome: new FormControl('', [Validators.required]),
     descricao: new FormControl('', [Validators.required]),
   });
 }
 
 submit() {

   if (this. departamentoForm.valid) {

     const deptData:  Departamento = this.departamentoForm.value;
                 
            deptData.status = true;

             if(this.action === 'Edit' && this.typeButton === 'Save'){
                   
               if(this.depEdition.nome === deptData.nome){
                     
                    this.showWarnMessage();
               }
               else{

                 //Passando o id do Departamento para actualizar
                deptData.departamentoID = this.depEdition.departamentoID;

                 this.userService.UpdateDepartamento(deptData).subscribe(
                   
                   (response) => {
                       
                     this.showSuccessMessage1();
                     
                     location.reload();

                   },
                   (error) => {

                     console.error('Erro ao Actualizar Departamento:', error);

                   }
                 );
               }
             }
             else{
               if(this.action === 'Add' && this.typeButton === 'Add'){
                     
                 let exist = null;

                  exist = this.departamentos.find(dep => deptData.nome.trim() === dep.nome.trim());
                  
                  if(exist === null || exist === undefined){
                       this.userService.CreateDepartment(deptData).subscribe(
                       
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
  
     this.departamentoForm.markAllAsTouched();
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