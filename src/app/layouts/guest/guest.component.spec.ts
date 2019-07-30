import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestComponent } from './guest.component';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from '../../modules/domanda/domanda-routing.module';

describe('GuestComponent', () => {
  let component: GuestComponent;
  let fixture: ComponentFixture<GuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [ GuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
