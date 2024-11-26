import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOnehallazgoComponent } from './list-onehallazgo.component';

describe('ListOnehallazgoComponent', () => {
  let component: ListOnehallazgoComponent;
  let fixture: ComponentFixture<ListOnehallazgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOnehallazgoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOnehallazgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
