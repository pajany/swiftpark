import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import { homeService } from '../home-header/home-header.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  HighlightRow: Number;
  ClickedRow: any;
  footerList: any[];
  path: string;
  header: string;
  constructor(
    public globalservice: GlobalService,
    public router: ActivatedRoute,
    public route: Router,
    public homeService: homeService,
    public spinner: NgxSpinnerService
  ) {
    this.ClickedRow = function (index) {
      this.HighlightRow = index;
    };
  }

  ngOnInit(): void {
    this.spinner.show();
    this.footerList = [];
    this.homeService.getDynamicPage().subscribe((page: any) => {
      this.spinner.hide();
      page.forEach(x => {
        if (x.footer_menu) {
          this.footerList.push(x);
        }
      });
    });
  }

  navigate(path) {
    this.route.navigate(['/pages', path]);
  }
}
