import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import { CommonUiComponent } from '../common-ui/common-ui.component';
import { homeService } from '../home-header/home-header.service';
@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.scss']
})
export class DynamicPageComponent extends CommonUiComponent implements OnInit {
  constructor(
    public router: ActivatedRoute,
    public globalservice: GlobalService,
    public route: Router,
    public homeService: homeService,
    public spinner: NgxSpinnerService
  ) {
    super(spinner);
    this.clickedHeaderRow = function (index) {
      this.HighlightRow = index;
    };
    this.clickedFooter = function (index) {
      this.HighlightFooterRow = index;
    };
  }
  HighlightRow: Number;
  HighlightFooterRow: number;
  clickedHeaderRow: any;
  clickedFooter: any;
  headerList: any[] = [];
  path: string;
  footerList: any[] = [];
  selectedHeader: number;
  selectedFooter: number = null;
  content: string = null;
  header: string = null;
  hearderList: any[];
  subData: any[] = [];
  year: any;
  ngOnInit(): void {
    this.spinner.show();
    this.year = new Date().getFullYear();
    this.homeService.getDynamicPage().subscribe((page: any) => {
      page.forEach(x => {
        if (x.header_menu && x.footer_menu) {
          this.headerList.push(x);
          this.footerList.push(x);
        } else if (x.header_menu) {
          this.headerList.push(x);
        } else {
          this.footerList.push(x);
        }
      });
      this.hearderList = page;

      this.spinner.show();
      this.router.params.subscribe((data: any) => {
        if (data) {
          this.path = data.header;
          this.routePath(data.header);
          this.spinner.hide();
        }
      });
      var path = location.hash;
      var directories = path.split('/');
      var lastDirecotry = directories[directories.length - 1];
      this.slug(lastDirecotry);
    });
  }
  slug(lastDirecotry) {
    const index = this.headerList.findIndex(y => y.page_slug === lastDirecotry && y.header_menu);
    this.selectedHeader = index;
    this.clickedHeaderRow(index);
    const i = this.footerList.findIndex(y => y.page_slug === lastDirecotry && y.footer_menu);
    this.clickedFooter(index);
  }
  routePath(path) {    
    window.scroll(0,0);
    const index = this.hearderList.findIndex(y => y.page_slug === this.path);
    if (index > -1) {
      this.content = this.hearderList[index].page_content;
      this.header = this.hearderList[index].page_title;
      this.subData = this.headerList[index].image_data;
    } else {
      this.route.navigate(['/home']);
    }
  }

  navigate(path) {
    this.route.navigate(['/pages', path]);
  }
}
