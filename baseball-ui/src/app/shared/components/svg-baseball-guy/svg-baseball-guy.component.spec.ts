import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgBaseballGuyComponent } from './svg-baseball-guy.component';

describe('SvgBaseballGuyComponent', () => {
  let component: SvgBaseballGuyComponent;
  let fixture: ComponentFixture<SvgBaseballGuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgBaseballGuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgBaseballGuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
