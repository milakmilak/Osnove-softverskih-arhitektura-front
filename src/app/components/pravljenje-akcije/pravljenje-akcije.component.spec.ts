import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PravljenjeAkcijeComponent } from './pravljenje-akcije.component';

describe('PravljenjeAkcijeComponent', () => {
  let component: PravljenjeAkcijeComponent;
  let fixture: ComponentFixture<PravljenjeAkcijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PravljenjeAkcijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PravljenjeAkcijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
