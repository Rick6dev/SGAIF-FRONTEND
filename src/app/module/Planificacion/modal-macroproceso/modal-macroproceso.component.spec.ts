import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMacroprocesoComponent } from './modal-macroproceso.component';

describe('ModalMacroprocesoComponent', () => {
  let component: ModalMacroprocesoComponent;
  let fixture: ComponentFixture<ModalMacroprocesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMacroprocesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMacroprocesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
