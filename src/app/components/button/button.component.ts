import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class AppButtonComponent implements OnInit {
  constructor() {}
  @Input() variant: string = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() classes: string = '';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;

  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {}

  onClick(event: any) {
    this.clicked.emit(event);
  }
}
