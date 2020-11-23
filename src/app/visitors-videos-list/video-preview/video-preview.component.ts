import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.scss']
})

export class VideoPreviewComponent implements OnInit {

  loading = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void { }

  check(): void {
    this.loading = false;
  }

}
