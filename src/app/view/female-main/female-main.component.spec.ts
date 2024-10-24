import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FemaleMainComponent } from './female-main.component';

describe('FemaleMainComponent', () => {
  let component: FemaleMainComponent;
  let fixture: ComponentFixture<FemaleMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FemaleMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FemaleMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
