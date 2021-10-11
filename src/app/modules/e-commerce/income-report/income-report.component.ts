// tslint:disable:no-string-literal
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductsService } from '../_services';
import { CustomAdapter , CustomDateParserFormatter, getDateFromString} from 'src/app/_metronic/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';


@Component({
  selector: 'app-income-report',
  templateUrl: './income-report.component.html',
  styleUrls: ['./income-report.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})

export class IncomeReportComponent implements OnInit{
  
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  
  private subscriptions: Subscription[] = []; 
   lot_no:'';
  fromdate:undefined;
  todate:undefined;

  constructor(
    private fb: FormBuilder,
     public productsService: ProductsService,
     private http: HttpClient,
  ) { }

  // angular lifecircle hooks
  ngOnInit(): void {
    this.filterForm();
    this.searchForm();
    this.productsService.fetch();
    const sb = this.productsService.isLoading$.subscribe(res => this.isLoading = res);
    this.subscriptions.push(sb); 
    this.productsService.fetch();
    $(".lotdata").hide();
   
  }


  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  // filtration
  filterForm() {
    this.filterGroup = this.fb.group({
      lot_no: [''],
      condition: [''],
      searchTerm: [''],
    });
    
  
  }

   
  filter() {
    const filter = {};
    const lot_no = this.filterGroup.get('lot_no').value;
    if (lot_no) {
      filter['lot_no'] = lot_no;
    }

    const condition = this.filterGroup.get('condition').value;
    if (condition) {
      filter['condition'] = condition;
    }
    this.productsService.patchState({ filter });
  }

  // search
  searchForm() {
    this.searchGroup = this.fb.group({
      lot_no: [''],
      fromdate: [''],
      todate: [''],
    });
    console.log("RRRRRRRRR",this.searchGroup);
  }

  search(searchTerm: string) {
    this.productsService.patchState({ searchTerm });
  }

  save() {
    const formData = this.searchGroup.value;
    console.log("fromdate", formData.fromdate);
    console.log("todate", formData.todate);
    console.log("lot_no", formData.lot_no);

  const fromdate = formData.fromdate;
  const todate = formData.todate;
  const lotno = formData.lot_no;

  var $HTMLData='';
  if (lotno != "") {
    this.http.get('http://127.0.0.1:8000/api/accountsummary?lotno='+lotno+'&fromdate='+fromdate+'&todate='+todate).subscribe((data: any) => {

      $("#lotTable").empty();
      $HTMLData ='<html>';
      $HTMLData+='<body>';

      $HTMLData+='<div class="form-group row">';
      $HTMLData+='  <label class="col-lg-2 " style="margin-top: 12px;"> Lot NO: </label>';
      $HTMLData+=' <div class="col-lg-6" style="margin-left: -102px;margin-top: 12px;">';
      $HTMLData+=''+data.lot_no +'';
      $HTMLData+='</div>';
      $HTMLData+=' </div>';
    
      $HTMLData+='<div class="form-group row">';
      $HTMLData+='  <label class="col-lg-2" style="margin-top: -20px;">  Address‎:  </label>';
      $HTMLData+=' <div class="col-lg-6" style="margin-top:-20px;margin-left: -105px;">';
      $HTMLData+=''+data.address +'';
      $HTMLData+='</div>';
      $HTMLData+=' </div>';

      $HTMLData+='<div class="form-group row">';
      $HTMLData+='  <label class="col-lg-2 " style="margin-top: -30px;"> Phone No‎:‎  </label>';
      $HTMLData+=' <div class="col-lg-7" style="margin-top: -27px;margin-left: -106px;">';
      $HTMLData+=''+data.phone +'';
      $HTMLData+='</div>';
      $HTMLData+='</div></br>';
     
      $HTMLData +='<table class="table" style="width:70%;">';
      $HTMLData +='<thead class="thead-light">';
      $HTMLData +='<tr>';
      $HTMLData +='<th scope="col">Permit No‎ </th>';
      $HTMLData +='<th scope="col">Permit Type</th>';
      $HTMLData +='<th scope="col">Payment Type‎</th>';
      $HTMLData +='<th scope="col">Plate No‎</th>';
      $HTMLData +='<th scope="col">Transaction Date ‎‎</th>';
      $HTMLData +='<th scope="col">Expiry Date ‎& ‎Time‎‎</th>';
      $HTMLData +='</tr>';
      $HTMLData +='</thead>';
      $HTMLData +='<tbody>';
for(var i=0;i<4;i++){
      $HTMLData +='<tr>';
      $HTMLData +='<td>'+data.thirtyday+'</td>';
      $HTMLData +='<td>'+data.month_permit+'</td>';
      $HTMLData +='<td>'+data.tax_amount+'</td>';
      $HTMLData +='<td>'+data.thirtyday+'</td>';
      $HTMLData +='<td>'+data.tax_amount+'</td>';
      $HTMLData +='<td>'+data.thirtyday+'</td>';
      $HTMLData +='</tr>';
}
      $HTMLData +='</tbody>';
      $HTMLData +='</table>';
      $HTMLData+='</body>';
      $HTMLData+='</html>';

    if(data){
      $("#lotTable").append($HTMLData);
      $(".lotdata").show();
    }else{
      $(".lotdata").hide();
    }
     
    });
  }
}

  }

 