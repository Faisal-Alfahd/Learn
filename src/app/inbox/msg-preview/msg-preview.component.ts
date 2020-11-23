import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Msg } from 'src/app/classes/msg';

@Component({
  selector: 'app-msg-preview',
  templateUrl: './msg-preview.component.html',
  styleUrls: ['./msg-preview.component.scss']
})
export class MsgPreviewComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Msg) { }

}
