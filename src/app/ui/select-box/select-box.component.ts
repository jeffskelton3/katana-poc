import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'kt-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.css']
})
export class SelectBoxComponent implements OnInit {
  @Input() options: { label: string, value: any}[] = [];
  @Output() onChange: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

}
