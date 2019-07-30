import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiDatiComponent } from './aggiungi-dati.component';

describe('AggiungiDatiComponent', () => {
  let component: AggiungiDatiComponent;
  let fixture: ComponentFixture<AggiungiDatiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggiungiDatiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungiDatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
