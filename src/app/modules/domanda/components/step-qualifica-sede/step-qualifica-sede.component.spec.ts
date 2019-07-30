import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepQualificaSedeComponent } from './step-qualifica-sede.component';

describe('StepQualificaSedeComponent', () => {
  let component: StepQualificaSedeComponent;
  let fixture: ComponentFixture<StepQualificaSedeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepQualificaSedeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepQualificaSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
