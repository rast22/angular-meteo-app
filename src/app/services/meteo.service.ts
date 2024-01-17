import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ICitySearchResult, IGeoInfo, IMeteo} from "../types/meteo.type";
import {MessageService} from "primeng/api";
import dayjs from 'dayjs';
import 'dayjs/locale/si';

dayjs.locale('en');
@Injectable({
  providedIn: 'root',
})
export class MeteoService {
  currentUserCoords!: { lat: number, lon: number };
  // currentUserGeoInfo!: IGeoInfo;

  private currentUserGeoInfoSource = new BehaviorSubject<IGeoInfo | null>(null);
  currentUserGeoInfo$ = this.currentUserGeoInfoSource.asObservable();

  private currentWeatherSource = new BehaviorSubject<IMeteo | null>(null);
  currentWeather$ = this.currentWeatherSource.asObservable();

  private weatherHistorySource = new BehaviorSubject<IMeteo | null>(null);
  weatherHistory$ = this.weatherHistorySource.asObservable();

  forecast_api_url='https://api.open-meteo.com/v1/forecast';
  constructor(private http: HttpClient, private toastService: MessageService) {
    console.log('MeteoService constructor');
  }

  getCurrentWeather(): void {
    let weather_url =   `https://api.open-meteo.com/v1/forecast?latitude=${this.currentUserGeoInfoSource.getValue()?.lat}&longitude=${this.currentUserGeoInfoSource.getValue()?.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timeformat=unixtime&timezone=auto`;

    this.http.get<IMeteo>(weather_url).subscribe({
      next: (res: IMeteo) => {
        if (!res) return;
        this.currentWeatherSource.next(res);
        this.toastService.add({severity:'success', summary: 'Success', detail: 'Weather data fetched successfully'});
      },
      error: (err) => {
        this.toastService.add({severity:'error', summary: 'Error', detail: 'Weather data fetch failed'});
        console.log(err)
      }
    }
    )
  }

  getWeatherHistory(): void {
    const endDate =   dayjs().subtract(3, 'day').format('YYYY-MM-DD'); // 7 days before startDate
    const startDate = dayjs(endDate).subtract(7, 'day').format('YYYY-MM-DD');

    const weather_url = `https://archive-api.open-meteo.com/v1/archive?latitude=${this.currentUserGeoInfoSource.getValue()?.lat}&longitude=${this.currentUserGeoInfoSource.getValue()?.lon}&start_date=${startDate}&end_date=${endDate}&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,temperature_2m_mean,apparent_temperature_max,apparent_temperature_min,apparent_temperature_mean,sunrise,sunset,daylight_duration,sunshine_duration,precipitation_sum,rain_sum,snowfall_sum,precipitation_hours,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timeformat=unixtime&timezone=auto`
    this.http.get<IMeteo>(weather_url).subscribe({
      next: (res: IMeteo) => {
        if (!res) return;
        console.log(res)
        this.weatherHistorySource.next(res);
        this.toastService.add({severity:'success', summary: 'Success', detail: 'Weather data fetched successfully'});
      },
      error: (err) => {
        this.toastService.add({severity:'error', summary: 'Error', detail: 'Weather data fetch failed'});
        console.log(err)
      }
    }
    )
  }

  getGeoInfo(): void {
    console.log('getGeoInfo')
    this.http.get<IGeoInfo>(`http://ip-api.com/json/?fields=status,message,continent,country,countryCode,regionName,city,zip,lat,lontimezone,query`).subscribe({
      next: (res: IGeoInfo) => {
        if (!res) return;
        if (this.currentUserCoords.lat && this.currentUserCoords.lon) {
          res.lat = this.currentUserCoords.lat;
          res.lon = this.currentUserCoords.lon;
        }
        this.currentUserGeoInfoSource.next(res);
        this.toastService.add({severity:'success', summary: 'Success', detail: 'Geo info fetched successfully'});
        this.getCurrentWeather();
        this.getWeatherHistory();
      },
      error: (err) => {
        this.toastService.add({severity:'error', summary: 'Error', detail: 'Geo data (external) fetch failed. You may face incorrect location names and data. Please refresh the page.'});
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

  setNewGeoInfo(geoInfo: IGeoInfo): void {
    this.currentUserGeoInfoSource.next(geoInfo);
    this.getCurrentWeather();
    this.getWeatherHistory();
  }

  findCityData(city: string): Observable<ICitySearchResult> {
    return this.http.get<ICitySearchResult>(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5&language=en&format=json`)
  }
}
