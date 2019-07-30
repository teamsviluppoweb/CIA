import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepCorsiDiFormazioneComponent } from './step-corsi-di-formazione.component';

describe('StepCorsiDiFormazioneComponent', () => {
  let component: StepCorsiDiFormazioneComponent;
  let fixture: ComponentFixture<StepCorsiDiFormazioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepCorsiDiFormazioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepCorsiDiFormazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
