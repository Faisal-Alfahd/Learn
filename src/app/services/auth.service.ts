import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isUserLogIn = new BehaviorSubject<boolean | null>(null);
  public isGuestLogIn = new BehaviorSubject<boolean | null>(null);
  constructor() { }
}
