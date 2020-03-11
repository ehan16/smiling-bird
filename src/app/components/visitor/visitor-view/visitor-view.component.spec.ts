import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorViewComponent } from './visitor-view.component';

describe('VisitorViewComponent', () => {
  let component: VisitorViewComponent;
  let fixture: ComponentFixture<VisitorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
