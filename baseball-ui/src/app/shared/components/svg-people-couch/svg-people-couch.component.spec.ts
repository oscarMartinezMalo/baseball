import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgPeopleCouchComponent } from './svg-people-couch.component';

describe('SvgPeopleCouchComponent', () => {
  let component: SvgPeopleCouchComponent;
  let fixture: ComponentFixture<SvgPeopleCouchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgPeopleCouchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgPeopleCouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
