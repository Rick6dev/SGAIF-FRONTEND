import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInformeComponent } from './list-informe.component';

describe('ListInformeComponent', () => {
  let component: ListInformeComponent;
  let fixture: ComponentFixture<ListInformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInformeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
