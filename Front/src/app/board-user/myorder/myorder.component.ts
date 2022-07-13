import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { OrderService } from 'src/app/_services/order.service';
import { map, Observable } from 'rxjs';

import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Orders } from 'src/app/models/order/order.model';
import { Tutorial } from 'src/app/models/tutorial.model';
import { StudentService } from 'src/app/_services/student.service';
import { TutorialService } from 'src/app/_services/tutorial.service';
 
import {NgxPaginationModule, PaginationService} from 'ngx-pagination'
import { ngxCsv } from 'ngx-csv/ngx-csv';
import * as XLSX  from 'xlsx';

  
@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {
  currentUser: any;
  modaltitle!: string;
  searchterm = "";
  page: number = 1;
  count: number = 0;  
  tableSize: number= 10;
  tableSizes: any = [10, 15, 20, 50, 100];
  title = 'download';
  filename = 'report.xlsx';
  totalRecords: any;
  tData!: any;
  pvalue:any;
  total!: number;
 
 
  
  tutorial: Tutorial = {
    title: '',
    description: '',
    service: '',
    price: '',
    customerid: '',
    published: false
  };
  submitted = false;
 
  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  customerid = '';
 
  constructor(private studentservice: StudentService,private tutorialService: TutorialService, private orderservice: OrderService,  public router: Router,private token: TokenStorageService,public paginate: PaginationService ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getStudent(this.currentUser.id);
    this.customerid = this.currentUser.id;
     
    this.searchTitle();
    
    this.tutorial.customerid  = this.customerid;
     
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
   

  
  saveTutorial(): void {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description,
      service: this.tutorial.service,
      price: this.tutorial.price,
      customerid:this.customerid 
    };

    this.tutorialService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });

      window.location.reload();
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      service: '',
      price: '' ,
      customerid:'',
      published: false
    };
  }

  
  retrieveTutorials(): void {
    this.tutorialService.getAll()
      .subscribe({
        next: (data) => {
          this.tutorials = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
    
   
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentTutorial = {};
    this.currentIndex = -1;
 
    this.tutorial.customerid  = this.customerid;
    this.tutorialService.findByCustmerid(this.customerid)
      .subscribe({
        next: (data) => {
          this.tutorials = data;
          this.findsum(this.tutorials);  
          this.totalRecords=this.tutorials.length;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
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
    this.searchTitle();
  }
  onTableSizeChange( event: any){
    this.tableSize= event.target.value;
    this.page = 1;
    this.searchTitle();
  }
 
  findsum(data:any[]){    
    debugger  
    this.pvalue=data;
    this.total = 0;
   // console.log(this.pvalue);  
    for(let j=0;j<data.length;j++){   
       this.total =  this.total+Number(this.pvalue[j].price);
       console.log(this.total)  
    }  
}
 
 
}