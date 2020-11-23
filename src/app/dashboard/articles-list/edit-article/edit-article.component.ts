import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Articles } from 'src/app/classes/articles';
import { ArticlesService } from 'src/app/services/articles.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  articleForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: Articles,
    private snackBar: MatSnackBar,
    private articlesService: ArticlesService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.articleForm = this.fb.group({
      articleTitle: [this.data.articleTitle],
      articleDescription: [this.data.articleDescription],
    });
    this.loaderService.loadingProgressBar.subscribe(value => {
      this.loading = value;
    });
  }

  updateArticle(): void {
    if (this.articleForm.invalid) {
      this.snackBar.open('الرجاء استكمال جميع البيانات', 'إغلاق', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      this.articlesService.updateArticle(this.data.articleId, this.articleForm.value);
    }
  }

}
