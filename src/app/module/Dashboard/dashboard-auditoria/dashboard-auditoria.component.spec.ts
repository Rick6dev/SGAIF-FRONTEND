import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAuditoriaComponent } from './dashboard-auditoria.component';

describe('DashboardAuditoriaComponent', () => {
  let component: DashboardAuditoriaComponent;
  let fixture: ComponentFixture<DashboardAuditoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAuditoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
