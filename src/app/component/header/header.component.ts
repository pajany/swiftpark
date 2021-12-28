import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(public router: ActivatedRoute, public route: Router, public homeService: homeService) {
    this.ClickedRow = function (index) {
      this.HighlightRow = index;
    };
  }

  ngOnInit(): void {
    this.hearderList = [];
    this.homeService.getDynamicPage().subscribe((page: any) => {
      page.forEach(x => {
        if (x.header_menu) {
          this.hearderList.push(x);
        }
      });
      this.router.params.subscribe((data: any) => {
        if (data) {
          this.path = data.header;
          this.routePath(data.header);
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
