import { Component, ElementRef, Input } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  standalone: false,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() id: string = '';
  @Input() title: string = '';

  private bsModal: Modal | undefined;

  constructor(private el: ElementRef) {}

  open() {
    const modalEl = this.el.nativeElement.querySelector('.modal');
    this.bsModal = new Modal(modalEl, { keyboard: false });
    this.bsModal.show();
  }

  close() {
    this.bsModal?.hide();
  }
}
