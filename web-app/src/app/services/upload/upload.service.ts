import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { FileUpload } from 'src/app/interfaces/file.upload.response.dto';

@Injectable({
  providedIn: 'root'
})
export class UploadService {


    // API url
    path = "/uploads"

    constructor(private cookieService: CookieService) { }

    // Returns an observable
    upload(file: File) {

        // Create form data
        const formData = new FormData();

        // Store form name as "file" with file data
        formData.append("file", file, file.name);

        const url = environment.appUrl + environment.apiVersionUri + this.path;
        const token = this.cookieService.get('token');
        return axios.post<FileUpload>(url, formData, { headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }});
    }
  }
