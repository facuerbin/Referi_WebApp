import { Injectable } from '@angular/core';

const storageName = 'ReferiApp';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
    this.initStorage();
  }

  private initStorage (): void {
    const storage = JSON.parse(localStorage.getItem(storageName) || "");
    if (! storage) localStorage.setItem(storageName, JSON.stringify([]));
  }

  private toggleNavbar (): void {
    const name = 'navToggle';
    const storage: string = JSON.parse(localStorage.getItem(name) || '');
    if (! storage) localStorage.setItem(name, JSON.stringify(false));
    console.log(storage);


  }
}
