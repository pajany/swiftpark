import { Component, OnInit } from '@angular/core';
//import { MatDialog } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-revenue-calculator',
  templateUrl: './revenue-calculator.component.html',
  styleUrls: ['./revenue-calculator.component.scss']
})
export class RevenueCalculatorComponent implements OnInit {
  htmlContent = '';
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote'
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1'
      }
    ]
  };
  revenueList: any[] = [
    {
      title: '30 Days',
      amount: 0,
      permits: 'No of Permits',
      permitNumber: 0,
      totalAmount: 0
    },
    {
      title: '24 Hour',
      amount: 0,
      permits: 'No of Permits',
      permitNumber: 0,
      totalAmount: 0
    },
    {
      title: 'Hourly',
      amount: 0,
      permits: 'Average Monthy Hours',
      permitNumber: 0,
      totalAmount: 0
    },
    {
      title: 'Overnight',
      amount: 0,
      permits: 'No of Permits',
      permitNumber: 0,
      totalAmount: 0
    },
    {
      title: 'All Day/Flate Rate',
      amount: 0,
      permits: 'No of Permits',
      permitNumber: 0,
      totalAmount: 0
    }
  ];
  constructor() {}

  totalAmount: number = 0;
  ngOnInit(): void {}
  onCellValueChanged(data: any) {
    debugger;
    data.totalAmount = (data.amount || 0) * (data.permitNumber || 0);
    this.totalAmount = this.revenueList.reduce(function (prev, cur) {
      return prev + cur.totalAmount;
    }, 0);
  }
}
// openDialog(): void {
//   const dialogRef = this.dialog.open(CalculatorDialog, {
//     maxWidth: '80%'
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     console.log('The dialog was closed');
//   });
// }
// }

// @Component({
//   selector: 'callculator-poup',
//   templateUrl: 'callculator-poup.html'
// })
// export class CalculatorDialog {

//   constructor(public dialogRef: MatDialogRef<CalculatorDialog>) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }
