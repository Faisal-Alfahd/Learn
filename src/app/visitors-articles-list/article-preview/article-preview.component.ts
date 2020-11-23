import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss']
})
export class ArticlePreviewComponent implements OnInit {

  loading = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private loaderService: LoaderService
  ) {
    this.loaderService.loading.next(false);
  }

  ngOnInit(): void {
  }

}
