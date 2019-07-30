import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDichiarazoiniComponent } from './step-dichiarazoini.component';

describe('StepDichiarazoiniComponent', () => {
  let component: StepDichiarazoiniComponent;
  let fixture: ComponentFixture<StepDichiarazoiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepDichiarazoiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepDichiarazoiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
