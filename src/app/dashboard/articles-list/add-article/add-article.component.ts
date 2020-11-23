import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileValidator } from 'ngx-material-file-input';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, of, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})

export class AddArticleComponent implements OnInit, OnDestroy {

  articleForm: FormGroup;

  percentage: Observable<number>;
  snapshot: Observable<UploadTaskSnapshot>;
  uploadTask: AngularFireUploadTask;
  uploadFileSubscription: Subscription;
  saveToDataBaseSubscription: Subscription;

  selectedFiles: FileList;

  uploadFileTask = false;
  saveToDataBaseTask = false;
  isFileTypeSuported = true;

  private readonly maxSize = 5242880;

  // 104857600;

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.articleForm = this.fb.group({
      articleTitle: [''],
      articleUrl: [''],
      articleFile: [undefined, [Validators.required, FileValidator.maxContentSize(this.maxSize)]],
      articleDescription: [''],
    });
  }

  private openSnackBar(msg: string): void {
    this.snackBar.open(msg, 'إغلاق', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['{"background-color":"green";"color":"#fff"}']
    });
  }

  private upload(file: File): void {
    this.uploadFileTask = true;
    const path = `pdfs/${new Date().getTime()}_${file.name}`;
    this.uploadTask = this.storage.upload(path, file);

    this.percentage = this.uploadTask.percentageChanges();
    this.uploadFileSubscription = this.uploadTask.snapshotChanges().subscribe(
      value => {
        this.uploadFileTask = true;
        this.snapshot = of(value);
      },
      error => {
        this.openSnackBar(error + '  حدث خطأ غير معروف الرجاء المحاولة مرة أخرى  ');
        this.uploadFileTask = false;
        this.cdr.markForCheck();
      },
      () => {
        this.uploadFileTask = false;
        this.saveToDataBaseTask = true;
        this.saveToDataBaseSubscription = this.storage.ref(path).getDownloadURL().subscribe(
          url => {
            this.db.collection('articles').add(
              {
                articleTitle: this.articleForm.get('articleTitle').value,
                articleUrl: url,
                path,
                articleDescription: this.articleForm.get('articleDescription').value,
              }
            ).then(() => {
              this.saveToDataBaseTask = false;
              this.articleForm.reset();
              this.openSnackBar('تم الحفظ بنجاح');
            }).catch((error: any) => {
              this.openSnackBar(error + '  حدث خطأ غير معروف الرجاء المحاولة مرة أخرى  ');
              this.saveToDataBaseTask = false;
              this.cdr.markForCheck();
            });
          },
          error => {
            this.openSnackBar(error + '  حدث خطأ غير معروف الرجاء المحاولة مرة أخرى  ');
            this.saveToDataBaseTask = false;
            this.cdr.markForCheck();
          }
        );
      }
    );
  }

  detectFiles($event): void {
    this.selectedFiles = $event.target.files;
    $event.target.files[0].type === 'application/pdf' ?
      this.isFileTypeSuported = true : this.isFileTypeSuported = false;
  }

  addArticle(): void {
    if (this.articleForm.invalid) {
      this.openSnackBar('الرجاء استكمال جميع البيانات والتأكد من أن حجم الملف لا يتعدى خمسة ميغابايت');
    } else if (!this.isFileTypeSuported) {
      this.openSnackBar('نوع الملف غير مدعوم لايُقبل إلا ملفات pdf فقط');
    } else {
      this.upload(this.selectedFiles.item(0));
    }
  }

  ngOnDestroy(): void {
    this.uploadFileSubscription.unsubscribe();
    this.saveToDataBaseSubscription.unsubscribe();
  }

}
