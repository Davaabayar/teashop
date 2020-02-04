import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(public http: HttpClient) { }

  uploadFile(formData: any) {
    return this.http.post(`${environment.serverURL}/api/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
