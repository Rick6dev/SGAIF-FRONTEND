import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHallazgoComponent } from './list-hallazgo.component';

describe('ListHallazgoComponent', () => {
  let component: ListHallazgoComponent;
  let fixture: ComponentFixture<ListHallazgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHallazgoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHallazgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
