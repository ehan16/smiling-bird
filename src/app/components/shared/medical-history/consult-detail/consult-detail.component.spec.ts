import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultDetailComponent } from './consult-detail.component';

describe('ConsultDetailComponent', () => {
  let component: ConsultDetailComponent;
  let fixture: ComponentFixture<ConsultDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
