import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {Tea} from './tea.model';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeasService {

  private _teas: BehaviorSubject<Tea[]> = new BehaviorSubject([]);
  public readonly teas: Observable<Tea[]> = this._teas.asObservable();
  private dataStore: { teas: Tea[] } = {teas: []};

  // teas: any[] = [];
  tea: any = null;
  private teasUpdated = new Subject<Tea[]>();

  constructor(private http: HttpClient) {
  }

  getTeas() {
    return this.teas;
  }

  loadTeas() {
    this.http.get<any>('http://localhost:3000/api/teas')
    .subscribe(res => {
        this.dataStore = {teas: res};
        this._teas.next(Object.assign({}, this.dataStore).teas);
      },
      err => console.error(err));
  }

  addTea(tea: Tea) {
    this.http
    .post<{ message: string, body: Tea }>(environment.serverURL + '/api/teas', tea)
    .subscribe(responseData => {
      const id = responseData.body._id;
      this.dataStore.teas.push(tea);
      this._teas.next(Object.assign({}, this.dataStore).teas);
    });
  }

  loadTea(id: string) {
    this.http.get<Tea>(environment.serverURL + '/api/teas/' + id)
    .subscribe(res => {
        let notFound = true;

        this.dataStore.teas.forEach((shop, index) => {
          if (shop._id === res._id) {
            this.dataStore.teas[index] = res;
            notFound = false;
          }
        });

        if (notFound) {
          this.dataStore.teas.push(res);
        }

        this._teas.next(Object.assign({}, this.dataStore).teas);
      },
      err => console.error(err)
    );
  }

  getTea(teaId: string) {
    return this.teas.pipe(map(teas => teas.find(tea => tea._id = teaId)));
  }

  async deleteTea(teaId: string) {
    await this.http.delete(environment.serverURL + '/api/teas/' + teaId)
    .subscribe((res) => {
      this.dataStore.teas.forEach((t, i) => {
        if (t._id === teaId) {
          this.dataStore.teas.splice(i, 1);
        }
      });
      this._teas.next(Object.assign({}, this.dataStore).teas);
    });
    return this.teas.pipe(map(teas => teas.filter(tea => tea._id != teaId)));
  }

  getCategories() {
    return ['Cold', "Improve digestion", "Boost immune system",
      "Reduce inflammation", "Anti-ageing", "Relieve stress and anxiety", "Lower blood pressure", "Skin health"];
  }

  getTags() {
    return ['Cold', "Improve digestion", "Boost immune system",
      "Reduce inflammation", "Anti-ageing", "Relieve stress and anxiety", "Lower blood pressure", "Skin health"];
  }

  addReview(reviewBody) {
    return this.http.post(environment.serverURL + '/api/teas/addreview', reviewBody);
    // .subscribe(responseData => {
    //   console.log('Review Added', responseData);
    // });
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
