import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsListComponent } from './teams-list';

describe('TeamsList', () => {
  let component: TeamsListComponent;
  let fixture: ComponentFixture<TeamsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
