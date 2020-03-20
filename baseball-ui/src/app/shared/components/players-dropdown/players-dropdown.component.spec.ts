import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersDropdownComponent } from './players-dropdown.component';

describe('PlayersDropdownComponent', () => {
  let component: PlayersDropdownComponent;
  let fixture: ComponentFixture<PlayersDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
