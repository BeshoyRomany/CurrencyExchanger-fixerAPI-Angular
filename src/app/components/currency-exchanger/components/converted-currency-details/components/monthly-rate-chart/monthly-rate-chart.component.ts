import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { InfoMessagesService } from '@currency-exchanger-core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid,
} from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import {
  RESPONSE_CHART,
  TIME_SERIES_DATA,
} from 'src/app/components/currency-exchanger/data/chart.data';
import { CurrenciesMessages } from 'src/app/components/currency-exchanger/enum/messages.enum';
import { MonthlyRatesResponse } from 'src/app/components/currency-exchanger/models/monthlyRate.model';
import { SelectedCurrencies } from 'src/app/components/currency-exchanger/models/selectedCurrencies.model';
import { CurrencyExchangerService } from 'src/app/components/currency-exchanger/services/currency-exchanger.service';

type ApexXAxis = {
  type?: 'category' | 'datetime' | 'numeric';
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'monthly-rate-chart',
  templateUrl: './monthly-rate-chart.component.html',
  styleUrls: ['./monthly-rate-chart.component.scss'],
})
export class MonthlyRateChartComponent implements OnChanges, OnInit, OnDestroy {
  @ViewChild('chart') chart!: ChartComponent;
  @Input() selectedConvertedAmount!: SelectedCurrencies;
  @Input() CurrencyName!: string;
  monthlyRateSubscriptions: Subscription[] = [];
  selectedMonthlyRate: number[] = [];
  pastYear = new Date().getFullYear() - 1;
  pastYearStart = `${this.pastYear}-01-01`;
  pastYearEnd = `${this.pastYear}-12-31`;
  chartLoaded = false;
  notAvailable = false;
  constructor(
    private currencyExchangerService: CurrencyExchangerService,
    private infoMessagesService: InfoMessagesService
  ) {}

  public chartOptions: Partial<ChartOptions> | any;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.selectedConvertedAmount.currentValue) {
      this.chartLoaded = false;
      this.selectedConvertedAmount =
        changes.selectedConvertedAmount.currentValue;
      this.getMonthlyRates();
    }
  }

  ngOnInit(): void {}

  getMonthlyRates() {
    let monthlyRateSubscription = this.currencyExchangerService
      .getMonthlyRate(
        this.pastYearStart,
        this.pastYearEnd,
        this.selectedConvertedAmount.selectedFrom.shortName,
        `${this.selectedConvertedAmount.selectedFrom.shortName}, ${this.selectedConvertedAmount.selectedTo.shortName}`
      )
      .subscribe(
        (result: MonthlyRatesResponse) => {
          this.proccessData(result);
        },
        (errResponse) => {
          this.infoMessagesService.handleErrorMessage(
            errResponse.error.message,
            3000
          );
          setTimeout(() => {
            this.infoMessagesService.handleSuccessMessage(
              CurrenciesMessages.LimitedAPIResquests,
              7000
            );
          }, 3000);
          this.notAvailable = true
        }
      );

    //Push the Subscription
    this.monthlyRateSubscriptions.push(monthlyRateSubscription);
  }

  //Proccess data to Get the Monthly rate is calculated based on rate in last day of that month
  proccessData(monthlyDataRates: MonthlyRatesResponse) {
    //Convert Rates Object to list array
    let listRatesStorgae = Object.entries(monthlyDataRates.rates);
    let mappedCurrencyYear = listRatesStorgae.map((rate) => {
      return {
        date: rate[0],
        rateOfTheMonth: rate[1][Object.keys(rate[1])[1]],
      };
    });

    //Grouping By Month Dates
    let groupKey = 0;
    let groups = mappedCurrencyYear.reduce(function (
      group: any,
      rate: { date: string; rateOfTheMonth: number }
    ) {
      //index 1 which is get month for the splited string 01, 02, 03
      var month = rate.date.split('-')[1];
      group[month]
        ? group[month].currencyRates.push(rate)
        : (group[month] = { group: groupKey++, currencyRates: [rate] });
      return group;
    },
    {});

    //Sorting Months
    let result = Object.keys(groups).map((month) => groups[month]);
    let currencyYearData = result.sort(
      (groupA, groupB) => parseFloat(groupA.group) - parseFloat(groupB.group)
    );

    //Get the Monthly rate is calculated based on rate in last day of that month
    let chatData = currencyYearData.map((month, i) => {
      const lastDayOfMonth =
        month.currencyRates[month.currencyRates.length - 1].rateOfTheMonth;
      return Number(lastDayOfMonth.toFixed(2));
    });
    this.selectedMonthlyRate = chatData;
    this.loadChart();
  }

  //Load chart options
  loadChart() {
    this.chartOptions = {
      series: [
        {
          name: 'distibuted',
          data: this.selectedMonthlyRate,
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false,
        },
        events: {
          click: function (char: any, w: any, e: any) {},
        },
      },
      colors: [
        'rgba(6, 40, 61, 0.85)',
        'rgba(244, 67, 54, 1)',
        'rgba(6, 40, 61, 0.85)',
        'rgba(244, 67, 54, 1)',
        'rgba(6, 40, 61, 0.85)',
        'rgba(244, 67, 54, 1)',
        'rgba(6, 40, 61, 0.85)',
        'rgba(244, 67, 54, 1)',
        'rgba(6, 40, 61, 0.85)',
        'rgba(244, 67, 54, 1)',
        'rgba(6, 40, 61, 0.85)',
        'rgba(244, 67, 54, 1)',
      ],

      plotOptions: {
        bar: {
          columnWidth: '50%',
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: [
          ['Jan'],
          ['Feb'],
          ['Mar'],
          ['Apr'],
          ['May'],
          ['Jun'],
          ['Jul'],
          ['Aug'],
          ['Sep'],
          ['Oct'],
          ['Nov'],
          ['Dec'],
        ],
        labels: {
          style: {
            colors: [
              'rgba(6, 40, 61, 0.85)',
              'rgba(6, 40, 61, 0.85)',
              'rgba(6, 40, 61, 0.85)',
              'rgba(6, 40, 61, 0.85)',
              'rgba(6, 40, 61, 0.85)',
              'rgba(6, 40, 61, 0.85)',
              'rgba(6, 40, 61, 0.85)',
              'rgba(6, 40, 61, 0.85)',
              'rgba(6, 40, 61, 0.85)',
              'rgba(6, 40, 61, 0.85)',
              'rgba(6, 40, 61, 0.85)',
              'rgba(6, 40, 61, 0.85)',
            ],
            fontSize: '12px',
          },
        },
      },
    };
    this.chartLoaded = true;
  }

  //Destroying
  ngOnDestroy(): void {
    //Destroying Subscriptions
    if (
      this.monthlyRateSubscriptions &&
      this.monthlyRateSubscriptions.length > 0
    ) {
      this.monthlyRateSubscriptions.forEach((subscription: Subscription) => [
        subscription.unsubscribe(),
      ]);
    }
  }
}
