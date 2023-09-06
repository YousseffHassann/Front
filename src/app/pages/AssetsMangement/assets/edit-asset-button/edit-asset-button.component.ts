import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-edit-asset-button',
  template: `
    <button nbButton status="warning" type="button" (click)="onClick()" style="width: 5rem;" ghost>{{ "تفاصيل الأصل" }}</button>
  `,
})
export class EditAssetButtonComponent implements OnInit {

  constructor() { }

  @Output() onPressed = new EventEmitter();

  ngOnInit() {
  }
  onClick() {
    this.onPressed.emit();
  }

}
