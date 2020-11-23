import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loading = false;
  userForm: FormGroup | undefined;
  subscription: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: [''],
      password: ['']
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

  login(): void {
    this.loaderService.loadingProgressBar.next(true);
    const email = this.userForm?.get('username')?.value + '@admin.com';
    const password = this.userForm?.get('password')?.value;
    if (email === '' || password === '') {
      this.openSnackBar('الرجاء استكمال البيانات');
      this.loaderService.loadingProgressBar.next(false);
    } else {
      this.afAuth.signInWithEmailAndPassword(email, password).then((user: any) => {
        this.auth.isUserLogIn.next(true);
        this.loaderService.loadingProgressBar.next(false);
        this.router.navigate(['./dashboard']);
      }).catch((error: any) => {
        this.auth.isUserLogIn.next(false);
        this.loaderService.loadingProgressBar.next(false);
        this.cdr.markForCheck();
        switch (error.code) {
          case 'auth/user-not-found':
            this.openSnackBar('الرجاء التأكد من اسم المستخدم او كلمة المرور');
            break;
          case 'auth/wrong-password':
            this.openSnackBar('الرجاء التأكد من اسم المستخدم او كلمة المرور');
            break;
          default:
            this.openSnackBar('حدث خطأ غير معروف الرجاء المحاولة مرة أخرى');
        }
      });
    }
  }

  async loginAsGuest(): Promise<any> {
    this.loaderService.loadingProgressBar.next(true);
    const signIn = await this.afAuth.signInAnonymously().catch(error => {
      this.openSnackBar('حدث خطأ، ربما تكون المشكلة باتصال الانترنت، الرجاء المحاولة مرة أخرى');
    });
    if (signIn) {
      this.auth.isGuestLogIn.next(true);
      this.router.navigate(['./home']);
    }
    this.loaderService.loadingProgressBar.next(false);
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
