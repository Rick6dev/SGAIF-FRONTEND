import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionVacacionComponent } from './gestion-vacacion.component';

describe('GestionVacacionComponent', () => {
  let component: GestionVacacionComponent;
  let fixture: ComponentFixture<GestionVacacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionVacacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionVacacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
