import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  signUp(form) {
    return this.http.post<any>('http://localhost:3000/user/signUp', form)
  }
  signIn(form) {
    return this.http.post<any>('http://localhost:3000/user/signIn', form)
  }
  sendQuiz(quizAns) {
    return this.http.post('http://localhost:3000/user/sendQuiz', quizAns)
  }
  checkEmail(email) {
    return this.http.get<any>('http://localhost:3000/user/checkEmail?email='+email)
  }

}
