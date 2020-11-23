import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectUsComponent } from './connect-us.component';

const routes: Routes = [{ path: '', component: ConnectUsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectUsRoutingModule { }
