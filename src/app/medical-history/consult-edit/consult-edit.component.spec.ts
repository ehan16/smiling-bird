import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultEditComponent } from './consult-edit.component';

describe('ConsultEditComponent', () => {
  let component: ConsultEditComponent;
  let fixture: ComponentFixture<ConsultEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
