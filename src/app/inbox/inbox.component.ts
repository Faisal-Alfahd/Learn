import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Msg } from '../classes/msg';
import { LoaderService } from '../services/loader.service';
import { MsgService } from '../services/msg.service';
import { MsgPreviewComponent } from './msg-preview/msg-preview.component';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  msgs: Msg[] = [];
  subscription!: Subscription;
  constructor(
    private msgService: MsgService,
    private loaderService: LoaderService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loaderService.loading.next(true);
    this.subscription = this.msgService.getAllMsgs().valueChanges({ idField: 'msgId' }).subscribe(
      value => {
        this.msgs = value;
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

  delete(id: string, templateRef: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(templateRef, {
      width: '350px'
    });
    dialogRef.afterClosed().subscribe((value: boolean) => {
      if (value) {
        this.msgService.deleteMsg(id);
      }
    });
  }

  showMsg(data: Msg): void {
    this.dialog.open(MsgPreviewComponent, {
      data,
    });
  }

}
