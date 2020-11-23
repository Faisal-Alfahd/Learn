import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxRoutingModule } from './inbox-routing.module';
import { InboxComponent } from './inbox.component';
import { MaterialModule } from '../material.module';
import { MsgPreviewComponent } from './msg-preview/msg-preview.component';


@NgModule({
  declarations: [InboxComponent, MsgPreviewComponent],
  imports: [
    CommonModule,
    InboxRoutingModule,
    MaterialModule
  ]
})
export class InboxModule { }
