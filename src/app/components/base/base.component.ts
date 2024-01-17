import { Component } from '@angular/core';
import {
  CurrentWeatherDashboardComponent
} from "../meteo-components/current-weather-dashboard/current-weather-dashboard.component";
import {WeatherCardComponent} from "../meteo-components/weather-card/weather-card.component";
import {
  HistoryWeatherDashboardComponent
} from "../meteo-components/history-weather-dashboard/history-weather-dashboard.component";

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [
    CurrentWeatherDashboardComponent,
    HistoryWeatherDashboardComponent,
    WeatherCardComponent
  ],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {

}
