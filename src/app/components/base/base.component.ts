import { Component } from '@angular/core';
import {
  CurrentWeatherDashboardComponent
} from "../meteo-components/current-weather-dashboard/current-weather-dashboard.component";
import {WeatherCardComponent} from "../meteo-components/weather-card/weather-card.component";

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [
    CurrentWeatherDashboardComponent,
    WeatherCardComponent
  ],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {

}
