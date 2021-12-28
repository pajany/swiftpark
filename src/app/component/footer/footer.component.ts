import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  hearderList: any[];
  path: string;
  header: string;
  constructor(
    public globalservice: GlobalService,
    public router: ActivatedRoute,
    public route: Router,
    public homeService: homeService
  ) {
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
    debugger;
    if (index > -1) {
      this.ClickedRow(index);
    }
  }

  navigate(path) {
    this.route.navigate(['/pages', path]);
  }
}
