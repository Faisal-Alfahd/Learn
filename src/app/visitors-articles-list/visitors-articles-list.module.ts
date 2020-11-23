import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitorsArticlesListRoutingModule } from './visitors-articles-list-routing.module';
import { VisitorsArticlesListComponent } from './visitors-articles-list.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [VisitorsArticlesListComponent],
  imports: [
    CommonModule,
    VisitorsArticlesListRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class VisitorsArticlesListModule { }
