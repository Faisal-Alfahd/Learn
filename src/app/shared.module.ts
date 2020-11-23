import { NgModule } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { YouTubePlayerModule } from '@angular/youtube-player';



@NgModule({
  declarations: [],
  imports: [],
  exports: [
    NgxExtendedPdfViewerModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    YouTubePlayerModule
  ]
})
export class SharedModule { }
