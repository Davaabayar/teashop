import { Component, OnInit } from '@angular/core';
import { TeasService } from '../teas.service';
import { Tea } from '../tea.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tea-detail',
  templateUrl: './tea-detail.component.html',
  styleUrls: ['./tea-detail.component.css']
})
export class TeaDetailComponent implements OnInit {
  tea: Tea;
  teaId;

  constructor(private teasService: TeasService, private router: ActivatedRoute) {
    this.router.params.subscribe(params => {
      this.teaId = params.teaId;
    });
  }

  ngOnInit() {
    this.teasService.getTea(this.teaId).subscribe(tea => {
      this.tea = JSON.parse(JSON.stringify(tea));
    });
  }
}
