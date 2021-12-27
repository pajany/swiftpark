import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(public router: ActivatedRoute, public route: Router) {
    this.ClickedRow = function (index) {
      this.HighlightRow = index;
    };
  }

  ngOnInit(): void {
    this.router.params.subscribe((data: any) => {
      this.path = data.header;
      this.routePath(data.header);
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
