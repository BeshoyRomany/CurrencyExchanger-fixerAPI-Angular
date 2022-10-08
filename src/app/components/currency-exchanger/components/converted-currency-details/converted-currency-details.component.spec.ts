import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertedCurrencyDetailsComponent } from './converted-currency-details.component';

describe('ConvertedCurrencyDetailsComponent', () => {
  let component: ConvertedCurrencyDetailsComponent;
  let fixture: ComponentFixture<ConvertedCurrencyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertedCurrencyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertedCurrencyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
