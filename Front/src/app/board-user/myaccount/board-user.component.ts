import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Students } from '../../models/student.model';
import { AuthService } from '../../_services/auth.service';
import { StudentService } from '../../_services/student.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
 
  currentUser: any;
  Students: any = [];
  constructor(private studentservice: StudentService, private authService: AuthService, private tokenStorage: TokenStorageService, public router: Router) { }
 
 
  ngOnInit(): void {

    this.currentUser = this.tokenStorage.getUser();
 

    this.getStudent(this.currentUser.id);
 console.log(this.currentUser.id);
  }

   
  getStudent(id: string): void {
    this.studentservice.get(id)
      .subscribe({
        next: (data) => {
          this.currentUser = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

   
}
