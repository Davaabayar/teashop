import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Tea } from '../models/tea';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeasService {

  teas: any[] = [];
  tea: any = null;
  private teasUpdated = new Subject<Tea[]>();
  constructor(private http: HttpClient) { }

  getTeas() {
    return this.http.get('http://localhost:3000/api/teas');
  }

  addTea(tea: Tea) {
    this.http
      .post<{ message: string, body: Tea }>('http://localhost:3000/api/teas', tea)
      .subscribe(responseData => {
        const id = responseData.body._id;
      });
    this.teas.push(tea);
    this.teasUpdated.next([...this.teas]);
  }

  getTea(teaId: string) {
    return this.http.get<Tea>(`${environment.serverURL}/api/teas/` + teaId);
  }

  deleteTea(teaId: string) {
    this.http
      .delete('http://localhost:3000/api/teas/' + teaId)
      .subscribe((res) => {
        const updatedTeas = this.teas.filter(tea => tea._id !== teaId);
        this.teas = updatedTeas;
        this.teasUpdated.next([...this.teas]);
      });
  }

  getCategories() {
    return ['Cold', "Improve digestion", "Boost immune system",
      "Reduce inflammation", "Anti-ageing", "Relieve stress and anxiety", "Lower blood pressure", "Skin health"];
  }

  getTags(): string[] {
    return ['Cold', "Improve digestion", "Boost immune system",
      "Reduce inflammation", "Anti-ageing", "Relieve stress and anxiety", "Lower blood pressure", "Skin health"];
  }

  addReview(reviewBody) {
    return this.http.post('http://localhost:3000/api/teas/addreview', reviewBody);
  }


  getTeasUpdateListener() {
    return this.teasUpdated.asObservable();
  }

  updateTea(tea: Tea) {
    this.http
      .put<{ message: string }>('http://localhost:3000/api/teas/' + tea._id, tea)
      .subscribe(response => console.log(response));
  }
}
