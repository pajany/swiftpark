import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public visibleFootContent: boolean;
  constructor() {this.visibleFootContent = false; }
  footerContentHide() { this.visibleFootContent = false; }
    
  footerContentShow() { this.visibleFootContent = true; }
}
