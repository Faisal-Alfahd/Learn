import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorsVideosListComponent } from './visitors-videos-list.component';

const routes: Routes = [{ path: '', component: VisitorsVideosListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorsVideosListRoutingModule { }
