import { ThisReceiver } from '@angular/compiler';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Students } from '../models/student.model';
import { StudentService } from '../_services/student.service';
import { TokenStorageService } from '../_services/token-storage.service';
 
import {NgxPaginationModule, PaginationService} from 'ngx-pagination'
import { ngxCsv } from 'ngx-csv/ngx-csv';
import * as XLSX  from 'xlsx';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public stunderform!: FormGroup;
  
  studentData!: any;
  isLoggedIn = false;
  showSave!: boolean;
  showUpdate!:boolean;
  modaltitle!: string;
  searchterm = "";
  page: number = 1;
  count: number = 0;  
  tableSize: number= 10;
  tableSizes: any = [10, 15, 20, 50, 100];
  title = 'download';
  filename = 'report.xlsx';
  totalRecords: any;

  form: any = {
    _id : null,
    username: null,
    email: null,
    password: null,
    roles: ["user"]
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';


  students?: Students[];
  currentStudent: Students = {
    username: '',
    email: '',
    password: '',
    roles: undefined,
    _id : '',
  };
  
  currentIndex = -1;
 

   
  constructor(private studentservice: StudentService, public router: Router, private tokenStorage: TokenStorageService,private formbuilder: FormBuilder, private authService:AuthService,  public paginate: PaginationService) { }

  ngOnInit(): void {
    this.retrieveStudents();
  }


  clickAddStudent(){
    this.stunderform.reset();
    this.showSave = true;
    this.showUpdate = false;
    this.modaltitle = "Add New Student";
  }

  onSubmit(): void {
    const { username, email, password, roles, name, phone} = this.form;

    this.authService.register(username, email, password, roles,name, phone).subscribe({
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
  }

  retrieveStudents(): void {
    
    this.studentservice.getAll()
      .subscribe({
        next: (data) => {

          this.studentData = data;
          this.totalRecords=this.studentData.length;
          this.students = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
 
       
 
  deletestudent(students: Students, index: number): void {
    this.studentservice.delete(students._id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.retrieveStudents();
        },
        error: (e) => console.error(e)
      });
  }

  setActiveStudents(students: Students, index: number): void {
    this.currentStudent = students;
    this.currentIndex = index;
  }
 

  exportExcel(): void{

    let element = document.getElementById('download');

    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(ws, [["Created "+new Date().toISOString()]], {origin:-1});

    XLSX.utils.book_append_sheet(wb,ws,'Sheet1')
    XLSX.writeFile(wb,this.filename)

   }

   onTableDataChange( event: any){
   
    this.page = event;
    this.retrieveStudents();
  }
  onTableSizeChange( event: any){
    this.tableSize= event.target.value;
    this.page = 1;
    this.retrieveStudents();
  }
      
 
  searchRole(): void {
   

    this.studentservice.findByrole(this.title)
      .subscribe({
        next: (data) => {
         
          this.students = data;
          console.log( );
         
        },
        error: (e) => console.error(e)
      });
  }
}
