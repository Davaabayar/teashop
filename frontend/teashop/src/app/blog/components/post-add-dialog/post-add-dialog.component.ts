import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-add-dialog',
  templateUrl: './post-add-dialog.component.html',
  styleUrls: ['./post-add-dialog.component.css']
})
export class PostAddDialogComponent implements OnInit {

  form = this.fb.group({
    title: ['', Validators.required]
  });

  constructor(
    private dialogRef: MatDialogRef<PostAddDialogComponent>,
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {

  }

  save() {

  }

  closeDialog() {
    this.dialogRef.close();
  }
}
