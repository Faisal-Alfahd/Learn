import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../material.module';
import { SharedModule } from '../shared.module';

import { VisitorsVideosListRoutingModule } from './visitors-videos-list-routing.module';
import { VisitorsVideosListComponent } from './visitors-videos-list.component';

@NgModule({
  declarations: [VisitorsVideosListComponent],
  imports: [
    CommonModule,
    VisitorsVideosListRoutingModule,
    SharedModule,
    MaterialModule,
  ]
})
export class VisitorsVideosListModule { }
