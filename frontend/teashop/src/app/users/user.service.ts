import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  signUp(form) {
    return this.http.post('http://localhost:3000/user/signUp', form)
  }
  signIn(form) {
    console.log(form)
    return this.http.post('http://localhost:3000/user/signIn', form)
  }
  getQuiz(index) {
    console.log('index : ' + index)
    return this.http.get('http://localhost:3000/user/getQuiz?index='+index)
  }
  checkEmail(email) {
    return this.http.get('http://localhost:3000/user/checkEmail?email='+email)
  }

}
