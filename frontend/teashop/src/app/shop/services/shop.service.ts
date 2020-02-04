import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Shop} from "../models/shop";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShopService implements OnDestroy {

  constructor(private http: HttpClient) {
  }

  private _shops: BehaviorSubject<Shop[]> = new BehaviorSubject([]);
  public readonly shops: Observable<Shop[]> = this._shops.asObservable();
  private dataStore: { shops: Shop[] } = {shops: []};
  private sub$;

  addShop(shop: Shop) {
    this.sub$ = this.http.post<any>('http://localhost:3000/shop/add', shop)
    .subscribe(res => {
      if (res.success) {
        this.dataStore.shops.push(shop);
        this._shops.next(Object.assign({}, this.dataStore).shops);
      } else console.error(res);
    });
  }

  getShops() {
    this.sub$ = this.http.get<any>('http://localhost:3000/shop')
    .subscribe(res => {
      if (res.success) {
        this.dataStore = res;
        this._shops.next(Object.assign({}, this.dataStore).shops);
      } else console.error(res);
    });
  }

  ngOnDestroy(): void {
    if (this.sub$) this.sub$.unsubscribe();
  }
}
