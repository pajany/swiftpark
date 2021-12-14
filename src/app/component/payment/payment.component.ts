import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  inputnumber = 0;
  visibleDiv:boolean = false;
  tableData = [
    {
      type: 'OverNight', amount: 0.00,  description: 'OverNight', quantity: 1
    },
    {
      type: 'All Day', amount: 0.00,  description: 'All Day', quantity: 2
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }
  plus(item: any)  {
    item.quantity ++;
  }
  minus(item: any)  {
    if(item.quantity != 0)  {
    item.quantity --;
    }
  
  }
  onCheckboxChange(event: any){
    console.log(event);
    if( event.isTrusted){
      this.visibleDiv = true;
    }
  }
  onRadioChange(index: any){
    switch (index) {
      case 1:
       
        break;
        case 2:
        
        break;
        case 3:
       
        break;
    
      default:
        break;
    }
       
  }
}
