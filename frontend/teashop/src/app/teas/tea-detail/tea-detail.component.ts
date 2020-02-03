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
  tea:Tea;
  constructor(private teasService:TeasService, private route:ActivatedRoute) { }

  ngOnInit() {      
    console.log('On detail init');     
    console.log(this.route.params['teaId']);  
    console.log(this.teasService.getTea('5e364218a16ac11dd870c41a'));
  }

}
