import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
 import { ViewTransactionService} from './view-transaction.services';
 import { NgxSpinnerService } from 'ngx-spinner';

 declare var $: any;

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.scss']
})
export class ViewTransactionComponent implements OnInit {

   transations: any = {};
   data : any;
   email: string = '';
   transactionhistory: any = [];

  
  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    public viewtransactionService: ViewTransactionService,
    ) {}

  ngOnInit(): void {

    this.spinner.show();
    this.route.queryParams.subscribe(res => {
      
      let params: any = {};
      (params.email = res.email);
      this.viewtransactionService.transactionSubmit(params).subscribe(
        (data: any) => {
          this.transactionhistory=data.data;
          this.spinner.hide();
          $('#viewtransactionModal').modal('hide');
        },
        (error: any) => {
          console.error(error);
          this.spinner.hide();
         // this.message = error.error.message;
          //this.showError(this.message);
        }
      );


    });

    
  

 

  }

}
 