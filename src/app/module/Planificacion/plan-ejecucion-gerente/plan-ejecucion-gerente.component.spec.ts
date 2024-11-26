import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEjecucionGerenteComponent } from './plan-ejecucion-gerente.component';

describe('PlanEjecucionGerenteComponent', () => {
  let component: PlanEjecucionGerenteComponent;
  let fixture: ComponentFixture<PlanEjecucionGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanEjecucionGerenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanEjecucionGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
