import { Component } from '@angular/core';
import {WeatherCardComponent} from "../meteo-components/weather-card/weather-card.component";
import {MeteoGraphComponent} from "../meteo-components/meteo-graph/meteo-graph.component";

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [
    WeatherCardComponent,
    MeteoGraphComponent
  ],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {

}
