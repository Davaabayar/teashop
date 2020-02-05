import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isLogged: boolean = false
  private userSource = new BehaviorSubject(this.isLogged)
  isUserOnline = this.userSource.asObservable()
  constructor() { }

  signIn(isLogged: boolean) {
    this.userSource.next(isLogged)
  }
}
