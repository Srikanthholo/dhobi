import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-studentregister',
  templateUrl: './studentregister.component.html',
  styleUrls: ['./studentregister.component.css']
})
export class StudentregisterComponent implements OnInit {
  form: any = {
   
    username: null,
    email: null,
    password: null,
    roles: ["user"],
    name:null,
    Phone:null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,  public router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, password, roles, name, phone } = this.form;

    this.authService.register(username, email, password, roles, name, phone).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
    alert("Your registration succesfull, Login to you account");
    this.router.navigate(['login']);

  }
}
