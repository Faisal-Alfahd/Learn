import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Videos } from '../classes/videos';
import { LoaderService } from '../services/loader.service';
import { VideosService } from '../services/videos.service';
import { VideoPreviewComponent } from './video-preview/video-preview.component';

@Component({
  selector: 'app-visitors-videos-list',
  templateUrl: './visitors-videos-list.component.html',
  styleUrls: ['./visitors-videos-list.component.css']
})

export class VisitorsVideosListComponent implements OnInit, OnDestroy {

  videos: Videos[] = [];
  subscription!: Subscription;

  constructor(
    private videosService: VideosService,
    private loaderService: LoaderService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loaderService.loading.next(true);
    this.subscription = this.videosService.getAllVideos().valueChanges({ idField: 'videoId' }).subscribe(
      value => {
        this.videos = value;
        this.loaderService.loading.next(false);
      },
      error => {
        this.snackBar.open('حدث خطأ غير متوقع الرجاء المحاولة مرة أخرى', 'إغلاق', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.loaderService.loading.next(false);
        this.cdr.markForCheck();
      },
      () => {
        this.loaderService.loading.next(false);
      }
    );
  }

  videoPreview(url: string): void {
    const regularExpressions = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const newUrl = url.match(regularExpressions)[1];
    this.dialog.open(VideoPreviewComponent, {
      data: newUrl,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
