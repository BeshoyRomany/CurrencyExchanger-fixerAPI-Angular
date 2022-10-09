import { Component, Input, ViewChild } from '@angular/core';
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
export class MonthlyRateChartComponent {
  @Input() CurrencyName!: string;
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'distibuted',
          data: [21, 22, 10, 28, 12, 21, 15, 30, 90, 88, 34, 33],
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false
        },
        events: {
          click: function (char: any, w: any, e: any) {
            // console.log(chart, w, e)
          },
        },
      },
      colors: [
        '#06283D',
        '#f44336',
        '#06283D',
        '#f44336',
        '#06283D',
        '#f44336',
        '#06283D',
        '#f44336',
        '#06283D',
        '#f44336',
        '#06283D',
        '#f44336',
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
              '#06283d',
              '#06283d',
              '#06283d',
              '#06283d',
              '#06283d',
              '#06283d',
              '#06283d',
              '#06283d',
              '#06283D',
              '#06283D',
              '#06283D',
              '#06283D',
            ],
            fontSize: '12px',
          },
        },
      },
    };
  }
}
