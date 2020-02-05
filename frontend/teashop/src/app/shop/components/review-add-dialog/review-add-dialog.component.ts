import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Review } from './reivew.model';
import { Validators, FormBuilder } from '@angular/forms';
import { TeasService } from '../../services/teas.service';
import { TokenService } from '../../../token.service'
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-review-add-dialog',
    templateUrl: 'review-add-dialog.component.html',
    styleUrls: ['review-add-dialog.component.css']
})
export class ReviewAddDialogComponent {
    reveiwForm = this.fb.group({
        teaId: [''],
        star: ['', Validators.required],
        comment: ['', Validators.required],
    });

    private subscription: Subscription;

    constructor(
        public dialogRef: MatDialogRef<ReviewAddDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Review,
        private fb: FormBuilder,
        private teaService: TeasService,
        private tokenService: TokenService
    ) {
        if (data != null) {

            this.reveiwForm.setValue({
                teaId: data.teaId,
                star: '',
                comment: ''
            });
        }
    }

    onSubmit() {
        if (this.reveiwForm.valid) {
            this.subscription = this.teaService.addReview({ 'token': this.tokenService.getToken(), 'review': this.reveiwForm.value })
                .subscribe(res => {
                    this.closeDialog();
                });
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    closeDialog() {
        this.dialogRef.close();
    }

}