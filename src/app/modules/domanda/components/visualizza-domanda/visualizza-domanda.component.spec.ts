import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzaDomandaComponent } from './visualizza-domanda.component';

describe('VisualizzaDomandaComponent', () => {
  let component: VisualizzaDomandaComponent;
  let fixture: ComponentFixture<VisualizzaDomandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizzaDomandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizzaDomandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
