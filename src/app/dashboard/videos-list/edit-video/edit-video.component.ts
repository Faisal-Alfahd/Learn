import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Videos } from 'src/app/classes/videos';
import { LoaderService } from 'src/app/services/loader.service';
import { VideosService } from 'src/app/services/videos.service';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})
export class EditVideoComponent implements OnInit {

  videoForm: FormGroup;
  loading = false;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: Videos,
    private snackBar: MatSnackBar,
    private videosService: VideosService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.videoForm = this.fb.group({
      videoTitle: [this.data.videoTitle],
      videoUrl: [this.data.videoUrl, [Validators.pattern('https?://.+|http?://.+')]],
      videoDescription: [this.data.videoDescription],
    });
    this.loaderService.loadingProgressBar.subscribe(value => {
      this.loading = value;
    });
  }

  updateVideo(): void {
    if (this.videoForm.controls.videoUrl.errors?.pattern === true) {
      this.snackBar.open('الرجاء التأكد من صحة الرابط', 'إغلاق', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else if (this.videoForm.invalid) {
      this.snackBar.open('الرجاء استكمال جميع البيانات', 'إغلاق', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      this.videosService.updateVideo(this.data.videoId, this.videoForm.value);
    }
  }

}
