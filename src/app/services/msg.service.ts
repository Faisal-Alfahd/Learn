import { ChangeDetectorRef, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Msg } from '../classes/msg';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  constructor(
    private afs: AngularFirestore,
    private loaderService: LoaderService,
    private snackBar: MatSnackBar,
  ) { }

  private openSnackBar(msg: string, durationTime: number): void {
    this.snackBar.open(msg, 'إغلاق', {
      duration: durationTime,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  getAllMsgs(): AngularFirestoreCollection<Msg> {
    return this.afs.collection('msgs');
  }

  addMsg(data: {}, form: FormGroup): void {
    this.loaderService.loadingProgressBar.next(true);
    this.afs.collection('msgs').add(data).then(() => {
      this.openSnackBar('تم حفظ وارسال البيانات بنجاح', 4000);
      this.loaderService.loadingProgressBar.next(false);
      form.reset();
    }).catch((reason: any) => {
      this.loaderService.loadingProgressBar.next(false);
      this.openSnackBar(`للأسف لم يتم حفظ البيانات، الرجاء المحاولة مرة أخرى لأسباب التالية ${reason}`, 4000);
    });
  }

  deleteMsg(id: string): void {
    this.loaderService.loading.next(true);
    try {
      this.afs.collection('msgs').doc(id).delete().then(() => {
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
