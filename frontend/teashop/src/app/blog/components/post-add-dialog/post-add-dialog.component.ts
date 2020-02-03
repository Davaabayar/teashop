import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PostService } from '../../services/post.service';
import { Subscription } from 'rxjs';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post-add-dialog',
  templateUrl: './post-add-dialog.component.html',
  styleUrls: ['./post-add-dialog.component.css']
})
export class PostAddDialogComponent implements OnInit, OnDestroy {

  form = this.fb.group({
    _id: [''],
    title: ['', Validators.required],
    body: ['', Validators.required],
    summary: ['', Validators.required],
    thumbnail: ['']
  });

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    width: 'auto',
    minWidth: '0',
    maxHeight: '200px',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter body here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['insertVideo']
    ]
  };

  private subscription: Subscription;

  constructor(
    private dialogRef: MatDialogRef<PostAddDialogComponent>,
    private fb: FormBuilder,
    private postService: PostService,
    @Inject(MAT_DIALOG_DATA) public data: Post
  ) {
    if (data != null) {
      this.form.setValue({
        _id: data._id,
        title: data.title,
        body: data.body,
        summary: data.summary,
        thumbnail: data.thumbnail
      });
    }
  }

  ngOnInit() {

  }

  save() {
    if (this.form.valid) {
      if (!this.form.value._id) {
        this.subscription = this.postService.savePost(this.makePost(this.form.value)).subscribe(res => {
          this.closeDialog();
        });
      } else {
        this.subscription = this.postService.updatePost(this.makePost(this.form.value)).subscribe(res => {
          this.closeDialog();
        });
      }
    }
  }

  makePost(object: Object) {
    let post: Post = JSON.parse(JSON.stringify(object));

    post.created = new Date();
    post.createdBy = "admin";
    post.status = 1;

    return post;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
