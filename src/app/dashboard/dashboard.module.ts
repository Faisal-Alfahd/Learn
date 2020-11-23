import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MaterialModule } from '../material.module';

import { MaterialFileInputModule } from 'ngx-material-file-input';

import { DashboardComponent } from './dashboard.component';
import { VideosListComponent } from './videos-list/videos-list.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { AddVideoComponent } from './videos-list/add-video/add-video.component';
import { EditVideoComponent } from './videos-list/edit-video/edit-video.component';
import { AddArticleComponent } from './articles-list/add-article/add-article.component';
import { EditArticleComponent } from './articles-list/edit-article/edit-article.component';

import { FileSize } from '../pipes/file-size.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    VideosListComponent,
    ArticlesListComponent,
    AddVideoComponent,
    EditVideoComponent,
    AddArticleComponent,
    EditArticleComponent,
    FileSize
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    MaterialFileInputModule,
    MaterialModule,
  ],
  entryComponents: [
    AddVideoComponent,
    EditVideoComponent,
    AddArticleComponent,
    EditArticleComponent,
  ]
})
export class DashboardModule { }
