import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Shop } from "../models/shop";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ShopService implements OnDestroy {

  constructor(private http: HttpClient) {
  }

  private _shops: BehaviorSubject<Shop[]> = new BehaviorSubject([]);
  public readonly shops: Observable<Shop[]> = this._shops.asObservable();
  private dataStore: { shops: Shop[] } = { shops: [] };
  private subForCreate$;
  private subForList$;
  private subForShop$;
  private ids = [];

  addShop(shop: Shop) {
    this.subForCreate$ = this.http.post<any>('http://localhost:3000/api/shop/add', shop)
      .subscribe(res => {
        if (res.success) {
          this.dataStore.shops.push(shop);
          this._shops.next(Object.assign({}, this.dataStore).shops);
        } else console.error(res);
      });
  }

  loadShop(id: string) {
    this.subForShop$ = this.http.get<Shop>('http://localhost:3000/api/shop/detail/' + id)
      .subscribe(res => {
        let notFound = true;

        this.dataStore.shops.forEach((shop, index) => {
          if (shop._id === res._id) {
            this.dataStore.shops[index] = res;
            notFound = false;
          }
        });

        if (notFound) {
          this.dataStore.shops.push(res);
        }

        this._shops.next(Object.assign({}, this.dataStore).shops);
      },
        err => console.error(err)
      );
  }

  loadShops() {
    this.subForList$ = this.http.get<any>('http://localhost:3000/api/shop')
      .subscribe(res => {
        if (res.success) {
          this.dataStore = { shops: res.arr };
          this._shops.next(Object.assign({}, this.dataStore).shops);
        } else console.error(res);
      });
  }

  getShop(id: string): Observable<Shop> {
    return this.shops.pipe(map(shops => shops.find(shop => shop._id = id)));
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ long: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });
  }


  async loadNearestShops(limit, maxDistance): Promise<Observable<Shop[]>> {
    await this.getPosition().then(pos => {
      this.subForShop$ = this.http.get<Shop[]>('http://localhost:3000/api/shop/nearest'
        + "?limit=" + limit
        + "&maxDistance=" + maxDistance
        + "&long=" + pos.long
        + "&lat=" + pos.lat
      )
        .subscribe(res => {
          res.forEach(s => {
            this.ids.push(s._id);
            let notFound = true;
            console.log(this.ids);
            this.dataStore.shops.forEach((shop, index) => {
              if (shop._id === s._id) {
                this.dataStore.shops[index] = s;
                notFound = false;
              }
            });
            if (notFound) {
              this.dataStore.shops.push(s);
            }
          });
          this._shops.next(Object.assign({}, this.dataStore).shops);
        },
          err => console.error(err)
        );
    });
    return this.shops.pipe(map(shops => shops.filter(shop => this.ids.includes(shop._id))));
  }

  ngOnDestroy(): void {
    if (this.subForCreate$) this.subForCreate$.unsubscribe();
    if (this.subForList$) this.subForList$.unsubscribe();
    if (this.subForShop$) this.subForShop$.unsubscribe();
  }
}
