import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequerimientoComponent } from './list-requerimiento.component';

describe('ListRequerimientoComponent', () => {
  let component: ListRequerimientoComponent;
  let fixture: ComponentFixture<ListRequerimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRequerimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
