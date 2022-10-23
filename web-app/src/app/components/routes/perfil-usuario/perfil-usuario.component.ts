import { Component, OnInit } from '@angular/core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/interfaces/get.user.response.dto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UploadService } from 'src/app/services/upload/upload.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  pencil = faPencilAlt;
  user: User | null = null;
  loading: boolean = false;
  fileToUpload: File | null = null;
  link = "";


  constructor(private auth: AuthService, private upload: UploadService) { }

  ngOnInit(): void {
    const user = this.auth.getUser();
    user.then(result => {
      this.user = result.data.data;
    });
  }

  onChange(event: any) {
    this.fileToUpload = event.target?.files[0];
    this.loading = !this.loading;
    if ( ! this.fileToUpload) throw new Error();
    this.upload.upload(this.fileToUpload).subscribe(
        (event: any) => {
            if (typeof (event) === 'object') {

                // Short link via api response
                this.link = event.link;

                this.loading = false; // Flag variable
            }
        }
    );
  }

}
