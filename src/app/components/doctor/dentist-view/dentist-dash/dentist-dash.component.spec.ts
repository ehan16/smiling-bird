import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistDashComponent } from './dentist-dash.component';

describe('DentistDashComponent', () => {
  let component: DentistDashComponent;
  let fixture: ComponentFixture<DentistDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DentistDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DentistDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
