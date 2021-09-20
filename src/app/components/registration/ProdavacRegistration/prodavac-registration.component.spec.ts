import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdavacRegistrationComponent } from './prodavac-registration.component';

describe('ProdavacRegistrationComponent', () => {
  let component: ProdavacRegistrationComponent;
  let fixture: ComponentFixture<ProdavacRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdavacRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdavacRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
