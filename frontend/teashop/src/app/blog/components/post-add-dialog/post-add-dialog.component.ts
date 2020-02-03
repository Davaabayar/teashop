import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-add-dialog',
  templateUrl: './post-add-dialog.component.html',
  styleUrls: ['./post-add-dialog.component.css']
})
export class PostAddDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<PostAddDialogComponent>,

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
