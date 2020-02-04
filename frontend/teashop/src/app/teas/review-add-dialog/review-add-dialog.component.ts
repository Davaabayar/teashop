import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Review } from './reivew.model';
import { Validators, FormBuilder } from '@angular/forms';
import { TeasService } from '../teas.service';


@Component({
    selector: 'app-review-add-dialog',
    templateUrl: 'review-add-dialog.component.html',
    styleUrls: ['review-add-dialog.component.css']
})
export class ReviewAddDialogComponent {
    reveiwForm = this.fb.group({
        star: ['', Validators.required],
        comment: ['', Validators.required],
    });
    @Input() thisTeaId;

    constructor(
        public dialogRef: MatDialogRef<ReviewAddDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Review,
        private fb: FormBuilder,
        private teaService: TeasService
    ) {
        if (data != null) {
            console.log(data);
        }
    }

    onSubmit() {
        if (this.reveiwForm.valid) {
            console.log('Save this', this.reveiwForm.value);

        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}