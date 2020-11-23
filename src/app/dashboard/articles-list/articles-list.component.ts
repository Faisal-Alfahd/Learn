import { ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Articles } from 'src/app/classes/articles';
import { ArticlesService } from 'src/app/services/articles.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ArticlePreviewComponent } from 'src/app/visitors-articles-list/article-preview/article-preview.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit, OnDestroy {

  articles: Articles[] = [];
  subscription!: Subscription;

  constructor(
    private articlesService: ArticlesService,
    private loaderService: LoaderService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
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

  addVideo(): void {
    this.dialog.open(AddArticleComponent, {
      panelClass: 'custom-dialog-container',
      disableClose: true,
      data: {},
    });
  }

  editVideo(id: string): void {
    this.loaderService.loading.next(true);
    this.subscription = this.articlesService.getArticleById(id).valueChanges().
      subscribe(
        article => {
          this.loaderService.loading.next(false);
          article.articleId = id;
          this.dialog.open(EditArticleComponent, {
            panelClass: 'custom-dialog-container',
            disableClose: true,
            data: article,
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

  delete(id: string, templateRef: TemplateRef<any>, filePath: string): void {
    const dialogRef = this.dialog.open(templateRef, {
      width: '350px'
    });
    dialogRef.afterClosed().subscribe((value: boolean) => {
      if (value) {
        this.loaderService.loading.next(true);
        this.articlesService.deleteArticle(id, filePath);
      }
    });
  }

  pdfPreview(url: string): void {
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
