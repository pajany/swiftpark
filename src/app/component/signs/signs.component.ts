import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signs',
  templateUrl: './signs.component.html',
  styleUrls: ['./signs.component.scss']
})
export class SignsComponent implements OnInit {
  signData: any = [];
  constructor() {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.signData = [
      {
        content: 'Public Parking Sign',
        imgSrc: '../../../assets/image/public_parking.png'
      },
      {
        content: 'Visitor Parking Sign',
        imgSrc: '../../../assets/image/visitor_parking.png'
      },
      {
        content: 'Public Parking Sign',
        imgSrc: '../../../assets/image/medical_parking.png'
      },
      {
        content: 'Event Parking Sign',
        imgSrc: '../../../assets/image/event_parking.png'
      },
      {
        content: 'Student Parking Sign',
        imgSrc: '../../../assets/image/student_parking.png'
      },
      {
        content: 'Obtain Permit Sign',
        imgSrc: '../../../assets/image/parking.png'
      }
    ];
  }
}
