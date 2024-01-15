import {Component, OnInit} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {TableModule} from "primeng/table";
import {CardModule} from "primeng/card";
import {MeteoService} from "../../../services/meteo.service";
import {IMeteo} from "../../../types/meteo.type";
import {comment} from "postcss";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-current-weather-dashboard',
  standalone: true,
  imports: [
    ChartModule,
    TableModule,
    CardModule,
    NgIf,
  ],
  templateUrl: './current-weather-dashboard.component.html',
  styleUrl: './current-weather-dashboard.component.scss'
})
export class CurrentWeatherDashboardComponent implements  OnInit {
  currentMeteo!: IMeteo;
  isLoading: boolean = true;
  temperatureData: any;
  precipitationData: any;
  windData: any;
  commonOptions: any;
  chartData: any;
  constructor(private meteoService: MeteoService) {
  }

  ngOnInit() {
    this.fetchWeatherData();
  }

  fetchWeatherData() {
    this.meteoService.currentUserGeoInfo$.subscribe({
      next: (data) => {
        console.log(data)
        if (!data) return;
        this.meteoService.getCurrentWeather().subscribe({
          next: (res: IMeteo) => {
            this.currentMeteo = res;
            this.initializeChartOptions();

            this.prepareChartData();
            this.isLoading = false;
          },
          error: (err) => {
            console.error(err);
            this.isLoading = false;
          }
        });
      }
    })

  }

  prepareChartData() {
    const dailyTimes = this.currentMeteo.daily.time;
    console.log(this.currentMeteo)
    const dailyTemperature = this.currentMeteo.daily.temperature_2m_max;
    const dailyPrecipitation = this.currentMeteo.daily.precipitation_sum;
    const dailyWindSpeed = this.currentMeteo.daily.wind_speed_10m_max;
    this.chartData = {
      labels: dailyTimes,
      datasets: [
        {
          label: 'Temperature',
          data: dailyTemperature,
          fill: false,
          backgroundColor: '#2196F3',
          tension: 0.4,
          minBarLength: 7
        },
        {
          label: 'Precipitation',
          data: dailyPrecipitation,
          fill: true,
          backgroundColor: '#FF9800',
          tension: 0.4,
          minBarLength: 10

        },
        {
          label: 'Wind Speed',
          data: dailyWindSpeed,
          fill: false,
          backgroundColor: '#4CAF50',
          tension: 0.4,
          minBarLength: 10

        }
      ]
    }
  }

  createChartData(labels: any, data: any, label: any, borderColor: any) {
    return {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          fill: false,
          borderColor: borderColor,
          tension: 0.4
        }
      ]
    };
  }

  initializeChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


    this.commonOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
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
  // currentMeteo!: IMeteo;
  // isLoading: boolean = true;
  // //-----
  // data: any;
  // options: any;
  //
  // constructor(private meteoService: MeteoService) {
  // }
  //
  // ngOnInit() {
  //
  //   const documentStyle = getComputedStyle(document.documentElement);
  //   const textColor = documentStyle.getPropertyValue('--text-color');
  //   const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  //   const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
  //
  //   this.data = {
  //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //     datasets: [
  //       {
  //         label: 'First Dataset',
  //         data: [65, 59, 80, 81, 56, 55, 40],
  //         fill: false,
  //         tension: 0.4,
  //         borderColor: documentStyle.getPropertyValue('--blue-500')
  //       },
  //       {
  //         label: 'Second Dataset',
  //         data: [28, 48, 40, 19, 86, 27, 90],
  //         fill: false,
  //         borderDash: [5, 5],
  //         tension: 0.4,
  //         borderColor: documentStyle.getPropertyValue('--teal-500')
  //       },
  //       {
  //         label: 'Third Dataset',
  //         data: [12, 51, 62, 33, 21, 62, 45],
  //         fill: true,
  //         borderColor: documentStyle.getPropertyValue('--orange-500'),
  //         tension: 0.4,
  //         backgroundColor: 'rgba(255,167,38,0.2)'
  //       }
  //     ]
  //   };
  //
  //   this.options = {
  //     maintainAspectRatio: false,
  //     aspectRatio: 0.6,
  //     plugins: {
  //       legend: {
  //         labels: {
  //           color: textColor
  //         }
  //       }
  //     },
  //     scales: {
  //       x: {
  //         ticks: {
  //           color: textColorSecondary
  //         },
  //         grid: {
  //           color: surfaceBorder
  //         }
  //       },
  //       y: {
  //         ticks: {
  //           color: textColorSecondary
  //         },
  //         grid: {
  //           color: surfaceBorder
  //         }
  //       }
  //     }
  //   };
  // }
