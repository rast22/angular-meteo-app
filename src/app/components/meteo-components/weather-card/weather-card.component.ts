import { Component } from '@angular/core';
import {CardModule} from "primeng/card";
import {MeteoService} from "../../../services/meteo.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {CustomCitySelectComponent} from "../custom-city-select/custom-city-select.component";
import {WeatherVisualBannerComponent} from "../weather-visual-banner/weather-visual-banner.component";
import {SkeletonModule} from "primeng/skeleton";
import {LoaderComponent} from "../../loader/loader.component";

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [
    CardModule,
    AsyncPipe,
    NgIf,
    NgForOf,
    CustomCitySelectComponent,
    WeatherVisualBannerComponent,
    SkeletonModule,
    LoaderComponent
  ],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss'
})
export class WeatherCardComponent {
  constructor(public meteo: MeteoService) {}
}
