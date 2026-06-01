import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { LoggedHeaderComponent } from './logged-header/logged-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent,
    LoggedHeaderComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    SidenavComponent,
    LoggedHeaderComponent
  ]
})
export class LayoutModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faChartPie);
  }

 }
