import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { homeService } from '../home-header/home-header.service';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.scss']
})
export class DynamicPageComponent implements OnInit {
  constructor(public router: ActivatedRoute, public route: Router, public homeService: homeService) {}

  path: string = null;
  content: string = null;
  header: string = null;
  hearderList: any[];
  ngOnInit(): void {
    this.homeService.getDynamicPage().subscribe((page: any) => {
      this.hearderList = page;
      this.router.params.subscribe((data: any) => {
        if (data) {
          debugger;
          this.path = data.header;
          this.routePath(data.header);
        }
      });
    });
  }

  routePath(path) {
    const index = this.hearderList.findIndex(y => y.page_slug === this.path);
    if (index > -1) {
      this.content = this.hearderList[index].page_content;
      this.header = this.hearderList[index].page_title;
    } else {
      this.route.navigate(['/home']);
    }
  }
}
