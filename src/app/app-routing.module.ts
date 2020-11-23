import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, GuastAuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found-component/not-found.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'login'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home', canActivate: [GuastAuthGuard], loadChildren: () =>
      import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'dashboard', canActivate: [AuthGuard], loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'visitors-videos-list', canActivate: [GuastAuthGuard], loadChildren: () =>
      import('./visitors-videos-list/visitors-videos-list.module').then(m => m.VisitorsVideosListModule)
  },
  {
    path: 'visitors-articles-list', canActivate: [GuastAuthGuard], loadChildren: () =>
      import('./visitors-articles-list/visitors-articles-list.module').then(m => m.VisitorsArticlesListModule)
  },
  {
    path: 'connect-us', canActivate: [GuastAuthGuard], loadChildren: () =>
      import('./connect-us/connect-us.module').then(m => m.ConnectUsModule)
  },
  {
    path: 'inbox', canActivate: [AuthGuard], loadChildren: () =>
      import('./inbox/inbox.module').then(m => m.InboxModule)
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
