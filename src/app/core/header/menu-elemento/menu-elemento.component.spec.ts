import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuElementoComponent } from './menu-elemento.component';

describe('MenuElementoComponent', () => {
  let component: MenuElementoComponent;
  let fixture: ComponentFixture<MenuElementoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuElementoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
