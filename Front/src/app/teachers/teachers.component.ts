import { Component, OnInit } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
 
import {NgxPaginationModule, PaginationService} from 'ngx-pagination'
import { StudentModel } from '../student/student.model';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.\css']
})
export class TeachersComponent implements OnInit {
  public stunderform!: FormGroup;
  studentModelObj: StudentModel = new StudentModel;
  studentData!: any;
  showSave!: boolean;
  showUpdate!:boolean;
  modaltitle!: string;
  searchterm!: any;
  page: number = 1;
  count: number = 0;
  tableSize: number= 10;
  tableSizes: any =[10, 15, 20, 50, 100]
   
   tpurl: any;
   
  constructor(private formbuilder: FormBuilder, private api:ApiService, public router : Router ) { }
 
 
  
  ngOnInit(): void {
 
   

    this.stunderform = this.formbuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      fees:[''],
      location:[''],
    })
    this.getAllStudents()
  }
  clickAddStudent(){
    this.stunderform.reset();
    this.showSave = true;
    this.showUpdate = false;
    this.modaltitle = "Add New Student";
  }
  postStudentDetails(){ 

    this.studentModelObj.name = this.stunderform.value.name;
    this.studentModelObj.email = this.stunderform.value.email;
    this.studentModelObj.mobile = this.stunderform.value.mobile;
    this.studentModelObj.fees = this.stunderform.value.fees;
    this.studentModelObj.location = this.stunderform.value.location;
  
    this.api.postStudent(this.studentModelObj).subscribe(res=>{
      console.log(res);
      alert("Student record added succeess")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.stunderform.reset();
      this.getAllStudents();
    },
      err=>{alert("Something Went Wrong")}
    
    )


  }
    getAllStudents(){
    this.api.getStudents().subscribe(res=>{
    this.studentData = res;
   // console.log(this.studentData.length + " Teachers Loaded");
   console.log(this.studentData);
    
    })
    }
    onTableDataChange( event: any){
       
      this.page = event;
      this.getAllStudents();
    }

    onTableSizeChange( event: any){
      this.tableSize= event.target.value;
      this.page = 1;
      this.getAllStudents();
    }
    
    deleteStudent(stu:any){
    
    this.api.deleteStudent(stu.id).subscribe(res=>{
    alert("Student Deleted successfully")
    this.getAllStudents()
    })
}
 
 
 
getteacher(id:any){
  this.api.findprofile(id).subscribe(res=>{
    this.studentData = res;
    this.tpurl = this.studentData.photourl;
 
    console.log(this.tpurl);
  })
  }

 
 
 
 
  onEdit(stu:any){
    this.showSave = false;
    this.showUpdate = true;
    this.modaltitle = "Student Details";
    this.studentModelObj.id = stu.id;
    this.stunderform.controls['name'].setValue(stu.name);
    this.stunderform.controls['email'].setValue(stu.email);
    this.stunderform.controls['mobile'].setValue(stu.mobile);
    this.stunderform.controls['fees'].setValue(stu.fees);
    this.stunderform.controls['location'].setValue(stu.location);
    this.stunderform.controls['photourl'].setValue(stu.photourl);

  }
  updateStudentDetails(){

      this.studentModelObj.name = this.stunderform.value.name;
      this.studentModelObj.email = this.stunderform.value.email;
      this.studentModelObj.mobile = this.stunderform.value.mobile;
      this.studentModelObj.fees = this.stunderform.value.fees;
      this.studentModelObj.location = this.stunderform.value.location;

      this.api.updateStudent(this.studentModelObj,this.studentModelObj.id).subscribe(res=>{
      alert("Student record updated");
      let ref = document.getElementById('cancel')
      ref?.click();
      
      this.stunderform.reset();
       this.getAllStudents();
    
      })
  }


}
 
 
 
 
 
 
 
 
 