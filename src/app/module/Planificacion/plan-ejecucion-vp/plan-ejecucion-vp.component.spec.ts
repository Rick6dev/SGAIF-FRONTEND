import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEjecucionVpComponent } from './plan-ejecucion-vp.component';

describe('PlanEjecucionVpComponent', () => {
  let component: PlanEjecucionVpComponent;
  let fixture: ComponentFixture<PlanEjecucionVpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanEjecucionVpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanEjecucionVpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
