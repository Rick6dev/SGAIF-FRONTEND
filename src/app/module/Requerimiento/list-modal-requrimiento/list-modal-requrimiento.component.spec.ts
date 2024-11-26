import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModalRequrimientoComponent } from './list-modal-requrimiento.component';

describe('ListModalRequrimientoComponent', () => {
  let component: ListModalRequrimientoComponent;
  let fixture: ComponentFixture<ListModalRequrimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListModalRequrimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListModalRequrimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
