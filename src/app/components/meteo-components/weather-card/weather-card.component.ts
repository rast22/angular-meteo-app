import { Component } from '@angular/core';
import {CardModule} from "primeng/card";
import {MeteoService} from "../../../services/meteo.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {IMeteo} from "../../../types/meteo.type";

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [
    CardModule,
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss'
})
export class WeatherCardComponent {
  currentWeather: IMeteo | undefined;
  constructor(public meteo: MeteoService) {
    this.meteo.currentUserGeoInfo$.subscribe({
      next: (data) => {
        console.log(data)
        if (!data) return;
        this.meteo.getCurrentWeather().subscribe((data: IMeteo | null) => {
          console.log(data)
          if (!data) return;
          this.currentWeather = data
        })
      }
    })
  }

}
