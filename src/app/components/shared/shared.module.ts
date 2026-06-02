import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ModalComponent } from './modal/modal.component';
import { PasswordInputComponent } from './password-input/password-input.component';
import { FormFeedbackComponent } from './form-feedback/form-feedback.component';
import { SpinnerButtonComponent } from './spinner-button/spinner-button.component';
import { QrCodeComponent } from './qr-code/qr-code.component';

@NgModule({
  declarations: [
    SearchBarComponent,
    ModalComponent,
    PasswordInputComponent,
    FormFeedbackComponent,
    SpinnerButtonComponent,
    QrCodeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  exports: [
    SearchBarComponent,
    ModalComponent,
    PasswordInputComponent,
    FormFeedbackComponent,
    SpinnerButtonComponent,
    QrCodeComponent,
  ]
})
export class SharedModule {}
