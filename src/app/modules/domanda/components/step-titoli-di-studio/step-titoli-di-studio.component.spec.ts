import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTitoliDiStudioComponent } from './step-titoli-di-studio.component';

describe('StepTitoliDiStudioComponent', () => {
  let component: StepTitoliDiStudioComponent;
  let fixture: ComponentFixture<StepTitoliDiStudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepTitoliDiStudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTitoliDiStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
