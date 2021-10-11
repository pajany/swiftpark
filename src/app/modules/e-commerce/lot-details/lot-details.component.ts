// tslint:disable:no-string-literal
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../_services';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
 
@Component({
  selector: 'app-lot-details',
  templateUrl: './lot-details.component.html',
  styleUrls: ['./lot-details.component.scss']
})

export class LotDetailsComponent implements OnInit{
  
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  private subscriptions: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  ExistLOTNOError: any; 

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
      searchTerm: [''],
    });
    const searchEvent = this.searchGroup.controls.searchTerm.valueChanges
      .pipe(
      
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe((val) => this.search(val));
      
    this.subscriptions.push(searchEvent);
  }

  search(searchTerm: string) {

    this.productsService.patchState({ searchTerm });
  }

  getlotnumber(event){

    const lotno = event.target.value;
    var $HTMLData='';
    if (lotno != "") {
      this.http.get('http://swiftpark.sdiphp.com/api/lotnodata?lotno=' + lotno).subscribe((data: any) => {

        $("#lotTable").empty();
        $HTMLData ='<html>';
        $HTMLData+='<body>';

        $HTMLData+='<div class="form-group row">';
        $HTMLData+='  <label class="col-lg-2 "> Lot NO: </label>';
        $HTMLData+=' <div class="col-lg-6">';
        $HTMLData+=''+data.lot_no +'';
        $HTMLData+='</div>';
        $HTMLData+=' </div>';

        $HTMLData+='<div class="form-group row">';
        $HTMLData+='  <label class="col-lg-2  ">  Lot Name:  </label>';
        $HTMLData+=' <div class="col-lg-6">';
        $HTMLData+=''+data.client_name +'';
        $HTMLData+='</div>';
        $HTMLData+=' </div>';

        $HTMLData+='<div class="form-group row">';
        $HTMLData+='  <label class="col-lg-2 "> Lot Address:  </label>';
        $HTMLData+=' <div class="col-lg-7">';
        $HTMLData+=''+data.address +'';
        $HTMLData+='</div>';
        $HTMLData+=' </div>';
       
        // $HTMLData +='<table border="1" style="width:70%;">';
        // $HTMLData +='<tr style="padding: 15px;">';
        // $HTMLData +=' <th style="background-color:#9FE2BF"><b>'+'Permit Type‎'+'</b></th>';
        // $HTMLData +=' <th style="background-color:#9FE2BF">'+'Amount‎'+'</th>';
        // $HTMLData +=' <th style="background-color:#9FE2BF">'+'Tax‎'+'</th>';
        // $HTMLData +=' <th style="background-color:#9FE2BF">'+'Duration‎'+'</th>';
        // $HTMLData +='</tr>';
      
        // $HTMLData +='<tr>';
        // $HTMLData +=' <td>'+data[0].twentyfourhour+'</td>';
        // $HTMLData +=' <td>'+data[0].day_permit+'</td>';
        // $HTMLData +=' <td>'+data[0].tax_amount+'</td>';
        // $HTMLData +=' <td>'+data[0].twentyfourhour+'</td>';
        // $HTMLData +='</tr>';
        // $HTMLData +='</table>';

        $HTMLData +='<table class="table" style="width:70%;">';
        $HTMLData +='<thead class="thead-light">';
        $HTMLData +='<tr>';
        $HTMLData +='<th scope="col">Permit Type</th>';
        $HTMLData +='<th scope="col">Amount‎</th>';
        $HTMLData +='<th scope="col">Tax‎</th>';
        $HTMLData +='<th scope="col">Duration‎</th>';
        $HTMLData +='</tr>';
        $HTMLData +='</thead>';
        $HTMLData +='<tbody>';

 
if(data.thirtyday !="false"){
          $HTMLData +='<tr>';
          $HTMLData +='<td>'+data.thirtyday+'</td>';
          $HTMLData +='<td>'+data.month_permit+'</td>';
          $HTMLData +='<td>'+data.tax_amount+'</td>';
          $HTMLData +='<td>'+data.thirtyday+'</td>';
          $HTMLData +='</tr>';
}
if(data.twentyfourhour !="false"){
        $HTMLData +='<tr>';
        $HTMLData +='<td>'+data.twentyfourhour+'</td>';
        $HTMLData +='<td>'+data.day_permit+'</td>';
        $HTMLData +='<td>'+data.tax_amount+'</td>';
        $HTMLData +='<td>'+data.twentyfourhour+'</td>';
        $HTMLData +='</tr>';
}
if(data.hourly	!="false"){
        $HTMLData +='<tr>';
        $HTMLData +='<td>'+data.hourly	+'</td>';
        $HTMLData +='<td>'+data.hourly_permit+'</td>';
        $HTMLData +='<td>'+data.tax_amount+'</td>';
        $HTMLData +='<td>'+data.hourly	+'</td>';
        $HTMLData +='</tr>';
}
if(data.allday !="false"){
        $HTMLData +='<tr>';
        $HTMLData +='<td>'+data.allday	+'</td>';
        $HTMLData +='<td>'+data.allday_permit_amount+'</td>';
        $HTMLData +='<td>'+data.tax_amount+'</td>';
        $HTMLData +='<td>'+data.allday	+'</td>';
        $HTMLData +='</tr>';
}
 
if(data.overnight !="false"){
        $HTMLData +='<tr>';
        $HTMLData +='<td>'+data.overnight	+'</td>';
        $HTMLData +='<td>'+data.overnight_permit+'</td>';
        $HTMLData +='<td>'+data.tax_amount+'</td>';
        $HTMLData +='<td>'+data.overnight	+'</td>';
        $HTMLData +='</tr>';
}
       
        $HTMLData +='</tbody>';
        $HTMLData +='</table>';
        $HTMLData +='</br>';
        $HTMLData+='<div class="form-group row">';
        $HTMLData+='  <label class="col-lg-2 "> Name: </label>';
        $HTMLData+=' <div class="col-lg-6">';
        $HTMLData+=''+data.lot_no +'';
        $HTMLData+='</div>';
        $HTMLData+=' </div>';

        $HTMLData+='<div class="form-group row">';
        $HTMLData+='<label class="col-lg-2  ">  Address:  </label>';
        $HTMLData+=' <div class="col-lg-6">';
        $HTMLData+=''+data.address +'';
        $HTMLData+='</div>';
        $HTMLData+=' </div>';

        $HTMLData+='<div class="form-group row">';
        $HTMLData+='<label class="col-lg-2 "> Phone No:  </label>';
        $HTMLData+=' <div class="col-lg-7">';
        $HTMLData+=''+data.phone +'';
        $HTMLData+='</div>';
        $HTMLData+=' </div>';

        $HTMLData+='<div class="form-group row">';
        $HTMLData+='<label class="col-lg-2 "> Email ID:  </label>';
        $HTMLData+=' <div class="col-lg-7">';
        $HTMLData+=''+data.email +'';
        $HTMLData+='</div>';
        $HTMLData+=' </div>';

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

 