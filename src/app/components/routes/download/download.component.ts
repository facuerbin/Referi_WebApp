import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
    load = false;

    constructor(private formBuilder: FormBuilder, private auth: AuthService) { }


    ngOnInit(): void {
      this.load = true;
    }

    downloadApp(){
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', '/assets/builds/referi_0.0.8.apk');
      link.setAttribute('download', `referi_0.0.8.apk`);
      document.body.appendChild(link);
      link.click();
      link.remove();
  }

}
