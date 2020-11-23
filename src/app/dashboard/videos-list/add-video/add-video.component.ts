import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from 'src/app/services/loader.service';
import { VideosService } from 'src/app/services/videos.service';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent implements OnInit {

  videoForm: FormGroup;

  loading = false;

  constructor(
    private fb: FormBuilder,
    private videosService: VideosService,
    private snackBar: MatSnackBar,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.videoForm = this.fb.group({
      videoTitle: [''],
      videoUrl: ['', [Validators.pattern('https?://.+|http?://.+')]],
      videoDescription: [''],
    });
    this.loaderService.loadingProgressBar.subscribe(value => {
      this.loading = value;
    });
  }

  addVideo(): void {
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
      this.videosService.addVideo(this.videoForm.value, this.videoForm);
    }
  }

}
