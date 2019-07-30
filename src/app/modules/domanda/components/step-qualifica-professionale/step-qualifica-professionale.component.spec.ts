import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepQualificaProfessionaleComponent } from './step-qualifica-professionale.component';

describe('StepQualificaProfessionaleComponent', () => {
  let component: StepQualificaProfessionaleComponent;
  let fixture: ComponentFixture<StepQualificaProfessionaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepQualificaProfessionaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepQualificaProfessionaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
