import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyRateChartComponent } from './monthly-rate-chart.component';

describe('MonthlyRateChartComponent', () => {
  let component: MonthlyRateChartComponent;
  let fixture: ComponentFixture<MonthlyRateChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyRateChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyRateChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
