import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { TeasService } from './shop/services/teas.service';
import { Tea } from './shop/models/tea';
import { environment } from 'src/environments/environment';
import { FormControl, FormBuilder } from '@angular/forms';


@Component({
    selector: 'app-tea-search',
    template: `
    <form [formGroup]="searchForm" (ngSubmit)="onSubmit()">
        <mat-form-field>
        <mat-select placeholder="Tags" [formControl]="searchTags" multiple>
        <mat-select-trigger>
            {{tagsList.value ? tagsList.value[0] : ''}}
            <span *ngIf="tagsList.value?.length > 1" class="example-additional-selection">
            (+{{tagsList.value.length - 1}} {{tagsList.value?.length === 2 ? 'other' : 'others'}})
            </span>
        </mat-select-trigger>
        <mat-option *ngFor="let tags of tagsList" [value]="tagsList">{{tags}}</mat-option>
        </mat-select>
    </mat-form-field>
    <button type="submit">Seearch</button>
    </form>`
})
export class SearchComponent implements OnInit {

    tags = new FormControl();
    toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
    tagsList: string[];

    constructor(private teasService: TeasService, private fb: FormBuilder) { }

    searchForm = this.fb.group({
        searchTags: ['']
    });

    ngOnInit() {
        this.tagsList = this.teasService.getTags();
        console.log(this.tagsList);
    }

    onSubmit() {
        console.log('onsubmit here');
        console.log(this.searchForm.value)
    }
}
