import { Component, OnInit } from '@angular/core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { PersonalOrganizacion } from 'src/app/interfaces/get.employee.org.dto';
import { User } from 'src/app/interfaces/get.user.response.dto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UploadService } from 'src/app/services/upload/upload.service';
import { environment } from 'src/environments/environment.prod';

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
  fechaString = "";
  fechaInicio: String[] = [];
  profileUrl =  environment.appUrl + environment.apiVersionUri + "/uploads/profile.jpeg";
  logoUrl = [environment.appUrl + environment.apiVersionUri + "/uploads/profile.jpeg"];
  organizaciones: PersonalOrganizacion[] = [];

  constructor(private auth: AuthService, private upload: UploadService) { }

  async ngOnInit(): Promise<void> {
    const user = this.auth.getUser();
    user.then(result => {
      this.user = result.data.data;
      this.fechaString = (this.user.fechaNacimiento + "").slice(0,10);
      if (result.data.data.fotoPerfil) this.profileUrl =  environment.appUrl + environment.apiVersionUri + "/" + result.data.data.fotoPerfil;
    });

    (await this.auth.listEmployeeOrganizations()).subscribe(res => {
      this.organizaciones = res.data;
      this.logoUrl = this.organizaciones.map(res => environment.appUrl + environment.apiVersionUri + "/" + res.organizacion.logo);
      this.fechaInicio = this.organizaciones.map( res => ("" + res.fechaCreacion).slice(0,10));
    })
  }

  onChange(event: any) {
    this.fileToUpload = event.target?.files[0];
    this.loading = !this.loading;
    if ( ! this.fileToUpload) throw new Error();
    this.upload.upload(this.fileToUpload).then(result => {
      this.loading = false;
      this.auth.updateUserImage(result.data.path, this.user?.id || "")
      .then(result => console.log(result))
      this.profileUrl = environment.appUrl + environment.apiVersionUri + "/" +result.data.path;
      return window.location.reload();

    })
    .catch( e => console.log(e));
  }

}
