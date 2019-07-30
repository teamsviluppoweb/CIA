import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiCorsiComponent } from './aggiungi-corsi.component';

describe('AggiungiCorsiComponent', () => {
  let component: AggiungiCorsiComponent;
  let fixture: ComponentFixture<AggiungiCorsiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggiungiCorsiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungiCorsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
