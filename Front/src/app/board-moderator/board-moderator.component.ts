import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css']
})
export class BoardModeratorComponent implements OnInit {
  content?: string;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  currentUser: any;
  constructor(private userService: UserService, private authService: AuthService, private tokenStorage: TokenStorageService, public router: Router) { }
 
 
  ngOnInit(): void {

    
    this.currentUser = this.tokenStorage.getUser();
    
  }

   
}
