import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMaleComponent } from './card-male.component';

describe('CardMaleComponent', () => {
  let component: CardMaleComponent;
  let fixture: ComponentFixture<CardMaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
