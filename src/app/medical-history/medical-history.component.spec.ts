import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryComponent } from './medical-history.component';

describe('MedicalHistoryComponent', () => {
  let component: MedicalHistoryComponent;
  let fixture: ComponentFixture<MedicalHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
