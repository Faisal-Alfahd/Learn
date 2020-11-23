import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean | null = false;
  isGuestLoggedIn: boolean | null = false;
  isLoading = false;

  constructor(
    private auth: AuthService,
    private loaderService: LoaderService,
    private router: Router,
    private fireAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.auth.isUserLogIn.subscribe(status => {
      this.isLoggedIn = status;
      this.router.navigate(['/login']);
    });
    this.loaderService.loading.subscribe(value => {
      this.isLoading = value;
      this.cdr.markForCheck();
    });
    this.auth.isGuestLogIn.subscribe(status => {
      this.isGuestLoggedIn = status;
      this.router.navigate(['/login']);
    });
  }

  logOut(): void {
    this.fireAuth.signOut().catch(error => {
      this.snackBar.open('حدث خطأ غير متوقع، الرجاء المحاولة مرة أخرى', 'إغلاق');
      return;
    });
    this.auth.isUserLogIn.next(null);
    this.auth.isGuestLogIn.next(null);
    this.router.navigate(['/login']);
  }
}
