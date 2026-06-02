import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-spinner-button',
  templateUrl: './spinner-button.component.html',
  styleUrls: ['./spinner-button.component.css']
})
export class SpinnerButtonComponent {
  @Input() loading: boolean = false;
  @Input() label: string = 'Aceptar';
  @Input() disabled: boolean = false;
  @Input() btnClass: string = 'btn btn-primary';
  @Output() clicked = new EventEmitter<void>();
}
