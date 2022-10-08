import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscribirSocioComponent } from './inscribir-socio.component';

describe('InscribirSocioComponent', () => {
  let component: InscribirSocioComponent;
  let fixture: ComponentFixture<InscribirSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscribirSocioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscribirSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
