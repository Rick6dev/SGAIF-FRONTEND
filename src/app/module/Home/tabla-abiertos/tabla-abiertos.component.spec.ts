import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAbiertosComponent } from './tabla-abiertos.component';

describe('TablaAbiertosComponent', () => {
  let component: TablaAbiertosComponent;
  let fixture: ComponentFixture<TablaAbiertosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaAbiertosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaAbiertosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
