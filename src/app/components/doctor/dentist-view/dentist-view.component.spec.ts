import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistViewComponent } from './dentist-view.component';

describe('DentistViewComponent', () => {
  let component: DentistViewComponent;
  let fixture: ComponentFixture<DentistViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DentistViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DentistViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
