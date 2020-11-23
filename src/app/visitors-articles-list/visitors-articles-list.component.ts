import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Articles } from '../classes/articles';
import { ArticlesService } from '../services/articles.service';
import { LoaderService } from '../services/loader.service';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';

@Component({
  selector: 'app-visitors-articles-list',
  templateUrl: './visitors-articles-list.component.html',
  styleUrls: ['./visitors-articles-list.component.css']
})
export class VisitorsArticlesListComponent implements OnInit, OnDestroy {

  articles: Articles[] = [];
  subscription!: Subscription;

  constructor(
    private articlesService: ArticlesService,
    private loaderService: LoaderService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loaderService.loading.next(true);
    this.subscription = this.articlesService.getAllArticles().valueChanges({ idField: 'articleId' }).subscribe(
      value => {
        this.articles = value;
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

  pdfPreview(url: string): void {
    this.loaderService.loading.next(true);
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      position: {
        top: '0',
        left: '0'
      },
      disableClose: true,
      autoFocus: true,
      height: '100vh',
      width: '100vw',
      maxWidth: '100vw',
      panelClass: 'custom-modal',
      data: url
    };
    this.dialog.open(ArticlePreviewComponent, dialogConfig);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
