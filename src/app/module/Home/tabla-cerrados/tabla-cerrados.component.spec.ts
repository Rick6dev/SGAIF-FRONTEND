import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCerradosComponent } from './tabla-cerrados.component';

describe('TablaCerradosComponent', () => {
  let component: TablaCerradosComponent;
  let fixture: ComponentFixture<TablaCerradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaCerradosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCerradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
