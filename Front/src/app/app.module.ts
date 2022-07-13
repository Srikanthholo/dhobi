import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/myaccount/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { StudentComponent } from './student/student.component';
import { TeachersComponent } from './teachers/teachers.component';
import { NgxPaginationModule } from 'ngx-pagination';
import *  as  XLSX from "xlsx";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { StudentregisterComponent } from './studentregister/studentregister.component';
 
import { UserComponent } from './user/user.component';
 
import { MyorderComponent } from './board-user/myorder/myorder.component';
import { OrderComponent } from './board-user/order/order.component';
 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    StudentComponent,
    TeachersComponent,
    UnauthorizedComponent,
    StudentregisterComponent,
     UserComponent,
    MyorderComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
   
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
