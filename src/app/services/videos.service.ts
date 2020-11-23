import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Videos } from '../classes/videos';
import * as firebase from 'firebase/app';
import { LoaderService } from './loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(
    private afs: AngularFirestore,
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

  getAllVideos(): AngularFirestoreCollection<Videos> {
    return this.afs.collection('videos');
  }

  getVideoById(id: string): AngularFirestoreDocument<Videos> {
    return this.afs.collection('videos').doc(id);
  }

  updateVideo(id: string, data: Videos): void {
    this.loaderService.loadingProgressBar.next(true);
    this.afs.collection('videos').doc(id).update(data).then(() => {
      this.openSnackBar('تم الحفظ بنجاح', 2000);
      this.loaderService.loadingProgressBar.next(false);
      this.dialog.closeAll();
    }).catch((error: any) => {
      this.openSnackBar('لم يتم حفظ التعديلات، الرجاء المحاولة مرة أخرى', 3000);
      this.loaderService.loadingProgressBar.next(false);
    });
  }

  addVideo(data: {}, form: FormGroup): void {
    this.loaderService.loadingProgressBar.next(true);
    this.afs.collection('videos').add(data).then(() => {
      this.openSnackBar('تم حفظ البيانات بنجاح، وتستطيع حفظ بيانات جديدة في حال أردت ذلك', 4000);
      this.loaderService.loadingProgressBar.next(false);
      form.reset();
    }).catch((reason: any) => {
      this.openSnackBar(`للأسف لم يتم حفظ البيانات، الرجاء المحاولة مرة أخرى لأسباب التالية ${reason}`, 4000);
      this.loaderService.loadingProgressBar.next(false);
    });
  }

  deleteVideo(id: string): void {
    this.loaderService.loading.next(true);
    try {
      this.afs.collection('videos').doc(id).delete().then(() => {
        this.openSnackBar('تم الحذف بنجاح', 1000);
        this.loaderService.loading.next(false);
      }).catch((error: any) => {
        this.openSnackBar('لم يتم الحذف، الرجاء المحاولة مرة أخرى او ان الملف غير موجود', 3000);
        this.loaderService.loading.next(false);
      });
    } catch (e) {
      console.log(e);
    }
  }

}
