import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcrSgaComponent } from './ccr-sga.component';

describe('CcrSgaComponent', () => {
  let component: CcrSgaComponent;
  let fixture: ComponentFixture<CcrSgaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcrSgaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcrSgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
