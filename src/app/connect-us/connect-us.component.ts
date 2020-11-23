import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { MsgService } from '../services/msg.service';

@Component({
  selector: 'app-connect-us',
  templateUrl: './connect-us.component.html',
  styleUrls: ['./connect-us.component.css']
})
export class ConnectUsComponent implements OnInit, OnDestroy {

  connectUsForm: FormGroup;
  loading = false;
  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private msgService: MsgService,
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.connectUsForm = this.fb.group({
      msgTitle: [''],
      msgContent: ['']
    });
    this.subscription = this.loaderService.loadingProgressBar.subscribe(value => {
      this.loading = value;
    });
  }

  private openSnackBar(msg: string): void {
    this.snackBar.open(msg, 'إغلاق', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  send(): void {
    this.loaderService.loadingProgressBar.next(true);
    if (this.connectUsForm.invalid) {
      this.openSnackBar('الرجاء استكمال جميع البيانات');
    } else {
      this.msgService.addMsg(this.connectUsForm.value, this.connectUsForm);
      this.loaderService.loadingProgressBar.next(false);
      this.cdr.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
