import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComentComponent } from './list-coment.component';

describe('ListComentComponent', () => {
  let component: ListComentComponent;
  let fixture: ComponentFixture<ListComentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
