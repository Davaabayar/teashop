import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormGroup, ControlContainer } from '@angular/forms';
import { UploadService } from './upload.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnDestroy {

  url: string;
  public form: FormGroup;
  fileData: File = null;
  previewUrl: any = "https://via.placeholder.com/150";
  fileUploadProgress: string = null;
  subscription: Subscription;

  constructor(private http: HttpClient,
    private controlContainer: ControlContainer,
    private uploadService: UploadService) { }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
      this.upload();
    }
  }

  ngOnInit() {
    this.form = <FormGroup>this.controlContainer.control;
  }

  upload() {
    const formData = new FormData();
    formData.append('file', this.fileData);

    this.fileUploadProgress = '0%';

    this.subscription = this.uploadService.uploadFile(formData)
      .subscribe(events => {
        if (events.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
        } else if (events.type === HttpEventType.Response) {
          this.fileUploadProgress = '';
          console.log(events.body);
          this.form.controls['thumbnail'].setValue(events.body['imageUrlShort']);
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription != undefined)
      this.subscription.unsubscribe();
  }

}
