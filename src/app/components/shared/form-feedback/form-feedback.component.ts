import { Component, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-form-feedback',
  templateUrl: './form-feedback.component.html',
  styleUrls: ['./form-feedback.component.css']
})
export class FormFeedbackComponent {
  @Input() success: boolean = false;
  @Input() successMessage: string = 'Operación realizada con éxito';
  @Input() error: boolean = false;
  @Input() errorMessage: string = 'Ha ocurrido un error';
}
