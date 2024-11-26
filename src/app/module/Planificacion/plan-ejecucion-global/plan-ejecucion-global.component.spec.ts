import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEjecucionGlobalComponent } from './plan-ejecucion-global.component';

describe('PlanEjecucionGlobalComponent', () => {
  let component: PlanEjecucionGlobalComponent;
  let fixture: ComponentFixture<PlanEjecucionGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanEjecucionGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanEjecucionGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
