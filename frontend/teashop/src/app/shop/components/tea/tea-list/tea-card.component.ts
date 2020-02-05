import { Component, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';

import { TeasService } from '../../../services/teas.service';
import { Tea } from '../../../models/tea';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-tea-card',
    template: `
    
    <div class="container">
        <div class="teaCard" *ngFor="let tea of data">
            <a [routerLink]="[tea._id]">
                <mat-card class="z-depth">
                    <img *ngIf="tea.thumbnail" mat-card-image src="{{serverURL + tea.thumbnail}}" alt="{{tea.teaName}}" />
                    <img *ngIf="!tea.thumbnail" mat-card-image
                        src="https://static.trotcdn.com/images/art/Clean_Beauty_Supporting.jpg" />
                    <mat-card-title>{{tea.teaName}}</mat-card-title>
                    <mat-card-subtitle>{{tea.shortName}}</mat-card-subtitle>
                    <mat-card-content>
                        <div *ngIf="tea.flavors">Flavors: <span *ngFor="let f of tea.flavors">{{f}} | </span></div>
                        <div *ngIf="tea.tags">Tags: <span *ngFor="let t of tea.tags">{{t}} | </span></div>
                        <div fxLayout="row" class="relative">
                            <mat-icon [style.color]="'orange'" *ngIf="5>1">star</mat-icon>
                            <mat-icon [style.color]="'orange'" *ngIf="5>2">star</mat-icon>
                            <mat-icon [style.color]="'orange'" *ngIf="5>3">star</mat-icon>
                            <mat-icon [style.color]="'orange'" *ngIf="5>4">star</mat-icon>
                            <mat-icon [style.color]="'orange'" *ngIf="5>=5">star_half</mat-icon>
                            <a class="t4">{{17}}</a>
                        </div>
                    </mat-card-content>
                </mat-card>
            </a>
        </div>
    </div>`,
    styleUrls: ['tea-list.component.css']
})
export class TeaCardComponent implements OnChanges, OnDestroy {
    @Input() data: Tea[];
    serverURL: string = environment.serverURL;
    color = 'primary';
    mode = 'determinate';
    value = 50;
    bufferValue = 75;

    constructor(private teasService: TeasService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['data']) {
            console.log('income data', this.data);
        }
    }

    ngOnDestroy() {

    }
    onDelete(id: string) {

    }
}
