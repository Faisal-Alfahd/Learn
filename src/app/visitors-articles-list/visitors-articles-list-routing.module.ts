import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorsArticlesListComponent } from './visitors-articles-list.component';

const routes: Routes = [{ path: '', component: VisitorsArticlesListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorsArticlesListRoutingModule { }
