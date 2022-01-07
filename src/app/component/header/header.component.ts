import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { homeService } from '../home-header/home-header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  HighlightRow: Number;
  ClickedRow: any;
  hearderList: any[];
  path: string;
  header: string;
  constructor(
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
    var path = location.hash;
    var directories = path.split('/');
    var lastDirecotry = directories[directories.length - 2];
    if (lastDirecotry != 'pages') {
      this.initHeader();
    }
  }

  initHeader() {
    this.spinner.show();
    this.hearderList = [];
    this.homeService.getDynamicPage().subscribe((page: any) => {
      this.spinner.hide();
      page.forEach(x => {
        if (x.footer_menu) {
          this.hearderList.push(x);
        }
      });
    });
  }

  routePath(path) {
    const index = this.hearderList.findIndex(y => y.path === this.path);
    if (index > -1) {
      this.ClickedRow(index);
    }
  }

  navigate(path) {
    this.route.navigate(['/pages', path]);
  }
}
