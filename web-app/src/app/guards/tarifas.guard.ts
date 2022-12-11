import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TarifasGuard implements CanActivate {
  constructor(private auth: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.promiseEmployeePermissions()
      .then(result => {

        const permisos = result.data[0].rol.permisos;
        const encontrado = permisos.find(permiso => {
          return permiso.modulo == 'TARIFAS';
        });

        if (encontrado) return true;
        return false;
      }).catch(e => {
        console.log(e)
        return false;
      })
  }
}
