import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  studentData!: any;
  searchterm!: any;
  page: number = 1;
  count: number = 0;
  tableSize: number= 10;
  tableSizes: any =[10, 15, 20, 50, 100]
  constructor(private userService: UserService, private authService: AuthService, private tokenStorage: TokenStorageService, public router: Router,  public  api: ApiService ) { }

 
  ngOnInit(): void {
 
       
    this.getAllStudents()


  }

  getAllStudents(){
    this.api.getStudents().subscribe(res=>{
    this.studentData = res;
    console.log(res)
    })
    }
}
