import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.scss']
})
export class DialogueComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;

  constructor(protected ref: NbDialogRef<DialogueComponent>) { }
  ngOnInit(): void {

  }

  dismiss() {
    this.ref.close();
  }
}
