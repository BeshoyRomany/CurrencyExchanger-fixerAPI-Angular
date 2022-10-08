import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyExchangerHeaderComponent } from './currency-exchanger-header.component';

describe('CurrencyExchangerHeaderComponent', () => {
  let component: CurrencyExchangerHeaderComponent;
  let fixture: ComponentFixture<CurrencyExchangerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyExchangerHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyExchangerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
