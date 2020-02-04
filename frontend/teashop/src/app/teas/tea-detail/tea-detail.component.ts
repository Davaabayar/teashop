import { Component, OnInit } from '@angular/core';
import { TeasService } from '../teas.service';
import { Tea } from '../tea.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tea-detail',
  templateUrl: './tea-detail.component.html',
  styleUrls: ['./tea-detail.component.css']
})
export class TeaDetailComponent implements OnInit {

  tea$: Observable<Tea>;
  teaId: string;

  constructor(private teasService: TeasService, private router: ActivatedRoute) {
    this.router.params.subscribe(params => {
      this.teaId = params.teaId;
    });
  }

  ngOnInit() {
    this.tea$ = this.teasService.getTea(this.teaId);
  }
}
