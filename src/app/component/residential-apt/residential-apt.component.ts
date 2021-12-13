import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-residential-apt',
  templateUrl: './residential-apt.component.html',
  styleUrls: ['./residential-apt.component.scss']
})
export class ResidentialAptComponent implements OnInit {

  constructor(public globalservice: GlobalService) {
    this.globalservice.footerContentHide();
   }


  ngOnInit(): void {
  }

}
