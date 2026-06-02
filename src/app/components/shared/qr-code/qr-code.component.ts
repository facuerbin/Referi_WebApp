import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import * as QRCode from 'qrcode';

@Component({
  standalone: false,
  selector: 'app-qr-code',
  template: '<canvas #canvas></canvas>',
})
export class QrCodeComponent implements OnChanges {
  @Input() data: string = '';
  @Input() width: number = 256;
  @Input() errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H' = 'M';

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  ngOnChanges() {
    if (!this.data) return;
    QRCode.toCanvas(this.canvas.nativeElement, this.data, {
      width: this.width,
      errorCorrectionLevel: this.errorCorrectionLevel,
    });
  }
}
