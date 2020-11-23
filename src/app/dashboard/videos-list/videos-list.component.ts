import { ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Videos } from 'src/app/classes/videos';
import { LoaderService } from 'src/app/services/loader.service';
import { VideosService } from 'src/app/services/videos.service';
import { MatDialog } from '@angular/material/dialog';
import { AddVideoComponent } from './add-video/add-video.component';
import { EditVideoComponent } from './edit-video/edit-video.component';
import { VideoPreviewComponent } from 'src/app/visitors-videos-list/video-preview/video-preview.component';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.scss']
})
export class VideosListComponent implements OnInit, OnDestroy {

  videos: Videos[] = [];
  subscription!: Subscription;

  constructor(
    private videosService: VideosService,
    private loaderService: LoaderService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
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

  addVideo(): void {
    this.dialog.open(AddVideoComponent, {
      panelClass: 'custom-dialog-container',
      disableClose: true,
      data: {},
    });
  }

  editVideo(id: string): void {
    this.loaderService.loading.next(true);
    this.subscription = this.videosService.getVideoById(id).valueChanges().
      subscribe(
        video => {
          this.loaderService.loading.next(false);
          video.videoId = id;
          this.dialog.open(EditVideoComponent, {
            panelClass: 'custom-dialog-container',
            disableClose: true,
            data: video,
          });
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

  delete(id: string, templateRef: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(templateRef, {
      width: '350px'
    });
    dialogRef.afterClosed().subscribe((value: boolean) => {
      if (value) {
        this.videosService.deleteVideo(id);
      }
    });
  }

  videoPreview(url: string): void {
    const regularExpressions = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const urlId = url.match(regularExpressions);
    this.dialog.open(VideoPreviewComponent, {
      data: urlId[1],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
