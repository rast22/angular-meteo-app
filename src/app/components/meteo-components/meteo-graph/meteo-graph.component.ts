import {Component, Input} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {NgIf} from "@angular/common";
import {SkeletonModule} from "primeng/skeleton";
import {IDailyUnits, IMeteo} from "../../../types/meteo.type";
import {MeteoService} from "../../../services/meteo.service";
import dayjs from "dayjs";

@Component({
  selector: 'app-meteo-graph',
  standalone: true,
    imports: [
        ChartModule,
        NgIf,
        SkeletonModule
    ],
  templateUrl: './meteo-graph.component.html',
  styleUrl: './meteo-graph.component.scss'
})
export class MeteoGraphComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() mode: 'current' | 'history' = 'current';
  currentMeteo!: IMeteo;
  isLoading: boolean = true;
  commonOptions: any;
  chartData: any;
  constructor(private meteoService: MeteoService) {
  }

  ngOnInit() {
    this.fetchWeatherData();
  }

  fetchWeatherData() {
    if (this.mode === 'current') {
      this.meteoService.currentWeather$.subscribe({
        next: (data) => {
          if (!data) return;
          this.currentMeteo = data;
          this.initializeChartOptions();

          this.prepareChartData();
          this.isLoading = false;
        }
      })
    } else {
      this.meteoService.weatherHistory$.subscribe({
        next: (data) => {
          if (!data) return;
          this.currentMeteo = data;
          this.initializeChartOptions();

          this.prepareChartData();
          this.isLoading = false;
        }
      })
    }
  }

  prepareChartData() {
    const dailyTimes = this.currentMeteo.daily.time.map(unixTime => {
      return dayjs.unix(unixTime).format('DD. MMMM YYYY');
    });
    const dailyTemperature = this.currentMeteo.daily.temperature_2m_max;
    const dailyPrecipitation = this.currentMeteo.daily.precipitation_sum;
    const dailyWindSpeed = this.currentMeteo.daily.wind_speed_10m_max;
    this.chartData = {
      labels: dailyTimes,
      datasets: [
        {
          label: 'Temperature',
          id:'temperature_2m_max',
          data: dailyTemperature,
          fill: false,
          backgroundColor: '#2196F3',
          tension: 0.4,
          minBarLength: 7,
        },
        {
          label: 'Precipitation',
          id:'precipitation_sum',
          data: dailyPrecipitation,
          fill: true,
          backgroundColor: '#FF9800',
          tension: 0.4,
          minBarLength: 10,
        },
        {
          label: 'Wind Speed',
          id:'wind_speed_10m_max',
          data: dailyWindSpeed,
          fill: false,
          backgroundColor: '#4CAF50',
          tension: 0.4,
          minBarLength: 10,
        }
      ]
    }
  }

  initializeChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const getUnitForLabelCallback = (id: keyof IDailyUnits) => this.currentMeteo.daily_units[id];

    this.commonOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              var label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y + ' ' + getUnitForLabelCallback(context.dataset.id)  ;
              }
              return label;
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }

      }
    }
  }
}
