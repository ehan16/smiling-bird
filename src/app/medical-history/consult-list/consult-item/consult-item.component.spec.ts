import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultItemComponent } from './consult-item.component';

describe('ConsultItemComponent', () => {
  let component: ConsultItemComponent;
  let fixture: ComponentFixture<ConsultItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
