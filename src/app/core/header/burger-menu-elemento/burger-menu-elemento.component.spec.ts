import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerMenuElementoComponent } from './burger-menu-elemento.component';

describe('BurgerMenuElementoComponent', () => {
  let component: BurgerMenuElementoComponent;
  let fixture: ComponentFixture<BurgerMenuElementoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BurgerMenuElementoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BurgerMenuElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
