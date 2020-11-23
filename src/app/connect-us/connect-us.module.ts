import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectUsRoutingModule } from './connect-us-routing.module';
import { ConnectUsComponent } from './connect-us.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ConnectUsComponent],
  imports: [
    CommonModule,
    ConnectUsRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ConnectUsModule { }
