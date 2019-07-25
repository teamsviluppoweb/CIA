import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomandaEditComponent } from './domanda-edit.component';

describe('DomandaEditComponent', () => {
  let component: DomandaEditComponent;
  let fixture: ComponentFixture<DomandaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomandaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomandaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
