import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarPlanificacionComponent } from './calendar-planificacion.component';

describe('CalendarPlanificacionComponent', () => {
  let component: CalendarPlanificacionComponent;
  let fixture: ComponentFixture<CalendarPlanificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarPlanificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarPlanificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
