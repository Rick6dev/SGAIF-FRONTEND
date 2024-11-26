import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModalhllzComponent } from './list-modalhllz.component';

describe('ListModalhllzComponent', () => {
  let component: ListModalhllzComponent;
  let fixture: ComponentFixture<ListModalhllzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListModalhllzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListModalhllzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
