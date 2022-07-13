import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/myaccount/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { StudentComponent } from './student/student.component';
import { TeachersComponent } from './teachers/teachers.component';
import { AuthGuard } from './shared/auth.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { RoleGuard } from './shared/role.guard';
import { TroleGuard } from './shared/trole.guard';
import { SroleGuard } from './shared/srole.guard';
import { StudentregisterComponent } from './studentregister/studentregister.component';
import { UserComponent } from './user/user.component';
import { MyorderComponent } from './board-user/myorder/myorder.component';
import { OrderComponent } from './board-user/order/order.component';

const routes: Routes = [
 
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
  { path: 'user', component: BoardUserComponent,canActivate: [SroleGuard]  },
  { path: 'myitems', component: MyorderComponent,canActivate: [SroleGuard]  },
  { path: 'orders', component: OrderComponent,canActivate: [SroleGuard]  },
  { path: 'mod', component: BoardModeratorComponent, canActivate: [TroleGuard] },
  { path: 'admin', component: BoardAdminComponent,canActivate: [RoleGuard] },
  { path: 'student', component: StudentComponent ,canActivate: [RoleGuard] },
  { path: 'userlist', component: UserComponent ,canActivate: [RoleGuard] },
  { path: 'teachers', component: TeachersComponent, canActivate: [RoleGuard] },
  { path: 'Unauthorized', component: UnauthorizedComponent },
  { path: 'studentregister', component: StudentregisterComponent },

  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
