import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'button-view',
  template: `
    <button nbButton status="success" type="button" (click)="onClick()" ghost style="width: 5rem;">{{ " معايير تقييم الأصل" }}</button>
  `,
})
export class AddAssetParamsButtonComponent implements OnInit {
  @Output() onPressed = new EventEmitter();
  ngOnInit() {
  }
  onClick() {
    this.onPressed.emit();
  }

}
