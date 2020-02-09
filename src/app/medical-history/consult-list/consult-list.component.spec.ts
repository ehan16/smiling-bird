import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultListComponent } from './consult-list.component';

describe('ConsultListComponent', () => {
  let component: ConsultListComponent;
  let fixture: ComponentFixture<ConsultListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
