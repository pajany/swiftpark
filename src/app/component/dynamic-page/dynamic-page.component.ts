import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.scss']
})
export class DynamicPageComponent implements OnInit {
  constructor(public router: ActivatedRoute, public route: Router) {}

  path: string = null;
  content: string = null;
  header: string = null;
  hearderList: any[];
  ngOnInit(): void {
    this.router.params.subscribe((data: any) => {
      if (data) {
        this.path = data.header;
        this.routePath(data.header);
      }
    });
  }

  routePath(path) {
    const index = this.hearderList.findIndex(y => y.path === this.path);
    if (index > -1) {
      this.content = this.hearderList[index].content;
    } else {
      this.route.navigate(['/home']);
    }
  }
}
