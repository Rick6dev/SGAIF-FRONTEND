import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTodosComponent } from './tabla-todos.component';

describe('TablaTodosComponent', () => {
  let component: TablaTodosComponent;
  let fixture: ComponentFixture<TablaTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaTodosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
