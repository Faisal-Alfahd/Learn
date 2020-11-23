import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Articles } from '../classes/articles';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private loaderService: LoaderService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  private openSnackBar(msg: string, durationTime: number): void {
    this.snackBar.open(msg, 'إغلاق', {
      duration: durationTime,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['{"background-color":"green";"color":"#fff"}']
    });
  }

  getAllArticles(): AngularFirestoreCollection<Articles> {
    return this.afs.collection('articles');
  }

  getArticleById(id: string): AngularFirestoreDocument<Articles> {
    return this.afs.collection('articles').doc(id);
  }

  updateArticle(id: string, data: Articles): void {
    this.loaderService.loadingProgressBar.next(true);
    this.afs.collection('articles').doc(id).update(data).then(() => {
      this.openSnackBar('تم الحفظ بنجاح', 2000);
      this.loaderService.loadingProgressBar.next(false);
      this.dialog.closeAll();
    }).catch((error: any) => {
      this.openSnackBar('لم يتم حفظ التعديلات، الرجاء المحاولة مرة أخرى', 3000);
      this.loaderService.loadingProgressBar.next(false);
    });
  }

  deleteArticle(id: string, filePath: string): void {
    this.afs.collection('articles').doc(id).delete().then((article) => {
      this.loaderService.loading.next(true);
      this.storage.ref(filePath).delete().subscribe(
        value => {
          this.openSnackBar('تم الحذف بنجاح', 1000);
          this.loaderService.loading.next(false);
        },
        error => {
          this.openSnackBar('حدث خطأ غير متوقع الرجاء المحاولة مرة أخرى', 2000);
          this.loaderService.loading.next(false);
        }
      );
    }).catch((error: any) => {
      this.openSnackBar('لم يتم الحذف، الرجاء المحاولة مرة أخرى او ان الملف غير موجود', 3000);
      this.loaderService.loading.next(false);
    });
  }
}
