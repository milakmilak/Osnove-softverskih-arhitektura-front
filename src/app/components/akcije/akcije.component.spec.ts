import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AkcijeComponent } from './akcije.component';

describe('AkcijeComponent', () => {
  let component: AkcijeComponent;
  let fixture: ComponentFixture<AkcijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AkcijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AkcijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
