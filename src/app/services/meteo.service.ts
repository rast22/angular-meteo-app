import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {IGeoInfo, IMeteo} from "../types/meteo.type";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root',
})
export class MeteoService {
  currentUserCoords!: { lat: number, lon: number };
  // currentUserGeoInfo!: IGeoInfo;

  private currentUserGeoInfoSource = new BehaviorSubject<IGeoInfo | null>(null);
  currentUserGeoInfo$ = this.currentUserGeoInfoSource.asObservable();

  forecast_api_url='https://api.open-meteo.com/v1/forecast';
  constructor(private http: HttpClient, private toastService: MessageService) {
    console.log('MeteoService constructor');
  }

  getCurrentWeather(): Observable<IMeteo> {
    let weather_url = ``;

    if (!this.currentUserCoords && this.currentUserGeoInfoSource.getValue()?.lon && this.currentUserGeoInfoSource.getValue()?.lat) {
      weather_url =   `https://api.open-meteo.com/v1/forecast?latitude=${this.currentUserGeoInfoSource.getValue()?.lat}&longitude=${this.currentUserGeoInfoSource.getValue()?.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timeformat=unixtime&timezone=auto`;
    } else if (this.currentUserCoords) {
      weather_url =   `https://api.open-meteo.com/v1/forecast?latitude=${this.currentUserCoords.lat}&longitude=${this.currentUserCoords.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timeformat=unixtime&timezone=auto`;
    }
    const res: Observable<IMeteo> = this.http.get<IMeteo>(weather_url)
    console.log(res)
    return res;
  }

  getGeoInfo(): void {
    console.log('getGeoInfo')
    this.http.get<IGeoInfo>(`http://ip-api.com/json/?fields=status,message,continent,country,countryCode,regionName,city,zip,lat,lontimezone,query`).subscribe({
      next: (res: IGeoInfo) => {
        this.currentUserGeoInfoSource.next(res);
        this.toastService.add({severity:'success', summary: 'Success', detail: 'Geo info fetched successfully'});
      },
      error: (err) => {
        console.log(err)
      }
    })

  }
  getUserGeo() {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        console.log(position)
        this.currentUserCoords = {lat: position.coords.latitude, lon: position.coords.longitude};
        this.getGeoInfo();
      },
      (error:GeolocationPositionError) => {
        this.toastService.add({severity:'error', summary: 'Error', detail: 'Please allow geolocation and restart the page, otherwise the weather data will be less accurate', life: 10000});
        this.getGeoInfo();
        console.log(error)
      },
      );
  }
}
