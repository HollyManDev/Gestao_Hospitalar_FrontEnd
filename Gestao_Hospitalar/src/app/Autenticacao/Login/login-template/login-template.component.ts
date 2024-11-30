import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-template',
  templateUrl: './login-template.component.html',
  styleUrls: ['./login-template.component.scss']
})
export class LoginTemplateComponent {
   
  userForm!: FormGroup;

  constructor(private userService: UserServiceService, private router: Router) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

    this.userForm.patchValue({
      email: 'holy@gmail.com',
      password: 'holy12'
    })
  }
  submit() {

    if (this.userForm.valid) {

      const userData: User = this.userForm.value;

      this.userService.AuthenticateUser(userData).subscribe(

        (response) => {
  
          if (response.data) {
            
            
            this.userService.SetUserAuthenticated(response.data.id);
           //this.showSuccessMessage();

            if(response.data.acess === 'Medico'){
              this.router.navigate(['/InicialMedico'])
            }
            else{
              this.router.navigate(['/HomeMain/HomeNavbar'])
            }
         
          } else {

            this.showErrorMessage('Invalid Credentials');

          }
        },
        
            (error) => {
          console.error('Error from User authentication:', error);
          this.showErrorMessage('Error authenticating user. Please try again later.');
        }
      );
    } else {
      this.showErrorMessage('Please fill out all required fields.');
   
      this.userForm.markAllAsTouched();
    }
  }
  
  showSuccessMessage() {
    Swal.fire({
      icon: 'success',
      title: 'Authenticated Successfully',
      showConfirmButton: false,
      timer: 2000 // 2 segundos
    });
  }

  showErrorMessage(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: message,
      showConfirmButton: false,
      timer: 2000 
    });
  }
}
