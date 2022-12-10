import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { FileUpload } from 'src/app/interfaces/file.upload.response.dto';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
    constructor() { }

    // Parses a string date into dd/mm/aaaa
    parseDate(date: string) {
      const anio = date.slice(0,4);
      const mes = date.slice(5,7);
      const dia = date.slice(8,10);
      return `${dia}/${mes}/${anio}`;
    }
  }
