import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

import { MaterialModule } from './material.module';
import { SharedModule } from './shared.module';
// import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';

import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { LoginComponent } from './login/login.component';
import { VideoPreviewComponent } from './visitors-videos-list/video-preview/video-preview.component';
import { ArticlePreviewComponent } from './visitors-articles-list/article-preview/article-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    LoginComponent,
    VideoPreviewComponent,
    ArticlePreviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [VideoPreviewComponent, ArticlePreviewComponent]
})
export class AppModule { }
