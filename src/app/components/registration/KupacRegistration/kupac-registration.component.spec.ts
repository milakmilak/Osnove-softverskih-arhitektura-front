import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KupacRegistrationComponent } from './kupac-registration.component';

describe('RegistrationComponent', () => {
  let component: KupacRegistrationComponent;
  let fixture: ComponentFixture<KupacRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KupacRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KupacRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
