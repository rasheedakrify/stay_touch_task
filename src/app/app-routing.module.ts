// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { AuthGuard } from './auth.guard';
import { EditMeetingComponent } from './edit-meeting/edit-meeting.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'create-meeting', component: CreateMeetingComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: EditMeetingComponent , canActivate: [AuthGuard]},

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/dashboard' } // Fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
