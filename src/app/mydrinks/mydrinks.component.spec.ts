import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MydrinksComponent } from './mydrinks.component';

describe('MydrinksComponent', () => {
  let component: MydrinksComponent;
  let fixture: ComponentFixture<MydrinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MydrinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MydrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
