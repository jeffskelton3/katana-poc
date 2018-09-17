import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'kt-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {

  @Input() placeholder;

  @Output() onKeyup: EventEmitter<string> = new EventEmitter<string>();


  constructor() {
  }

  ngOnInit() {
  }

}
