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
  tea:any= null;
  private teasUpdated = new Subject<Tea[]>();
  private categories = [];
  constructor(private http: HttpClient){}

  getTeas() {
    this.http.get(
      'http://localhost:3000/api/teas')
      .subscribe(result=> {
      //  this.teas = result;          
        this.teasUpdated.next([...this.teas]);
      });
    return [...this.teas];
  }

  getTeasUpdateListener() {
    return this.teasUpdated.asObservable();
  }

  addTea(tea:Tea){
    // const tea:Tea = {_id:null, name:name, shortName:shortName};
    this.http
      .post<{message:string, body: Tea}>('http://localhost:3000/api/teas', tea)
      .subscribe(responseData => {
        const id = responseData.body._id;
      });
    this.teas.push(tea);
    this.teasUpdated.next([...this.teas]);
  }

  deleteTea(teaId:string){
    this.http
      .delete('http://localhost:3000/api/teas/'+teaId)
      .subscribe((res)=>{
        const updatedTeas = this.teas.filter(tea => tea._id !== teaId);
        this.teas = updatedTeas;
        this.teasUpdated.next([...this.teas]);
      });
  }

  getCategories(){
    return ['A','B'];
  }

  getTea(teaId:string){    
    if(this.teas.length==0){
      this.http.get('http://localhost:3000/api/teas/'+teaId)
      .subscribe((res)=>{       
        this.tea = res;
      });
    }else{
      this.tea = {...this.teas.find(t=>t._id === teaId)};
    }
    return this.tea;
  }

  updateTea(tea:Tea){
    this.http
      .put<{message:string}>('http://localhost:3000/api/teas/'+tea._id, tea)
      .subscribe(response => console.log(response));
  }
}
