import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Tea } from './tea.model';

@Injectable({
  providedIn: 'root'
})
export class TeasService {

  teas: any[] = [];
  tea: any = null;
  private teasUpdated = new Subject<Tea[]>();
  private categories = [];
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
    //   console.log(this.tea);
    //   console.log(this.tea);
    //   console.log(this.teasUpdated);
    //   console.log(this.categories);
    //   this.tea = { ...this.teas.find(t => t._id === teaId) };

    // console.log("HERE", this.tea);
    // return this.tea;
    // console.log('Tea service', teaId);
    return this.http.get('http://localhost:3000/api/teas/' + teaId);
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

  getTags() {
    return ['Cold', "Improve digestion", "Boost immune system",
      "Reduce inflammation", "Anti-ageing", "Relieve stress and anxiety", "Lower blood pressure", "Skin health"];
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
