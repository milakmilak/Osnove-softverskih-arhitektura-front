import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojiArtikliComponent } from './moji-artikli.component';

describe('MojiArtikliComponent', () => {
  let component: MojiArtikliComponent;
  let fixture: ComponentFixture<MojiArtikliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MojiArtikliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MojiArtikliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
