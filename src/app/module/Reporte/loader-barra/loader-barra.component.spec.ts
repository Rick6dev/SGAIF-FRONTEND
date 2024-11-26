import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderBarraComponent } from './loader-barra.component';

describe('LoaderBarraComponent', () => {
  let component: LoaderBarraComponent;
  let fixture: ComponentFixture<LoaderBarraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderBarraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderBarraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
