import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { ICitySearchResult, IGeoInfo, IMeteo } from "../types/meteo.type";
import { MessageService } from "primeng/api";
import dayjs from 'dayjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class MeteoService {
  private currentUserCoords!: { lat: number, lon: number };
  private currentUserGeoInfoSource = new BehaviorSubject<IGeoInfo | null>(null);
  currentUserGeoInfo$ = this.currentUserGeoInfoSource.asObservable();

  private currentWeatherSource = new BehaviorSubject<IMeteo | null>(null);
  currentWeather$ = this.currentWeatherSource.asObservable();

  private weatherHistorySource = new BehaviorSubject<IMeteo | null>(null);
  weatherHistory$ = this.weatherHistorySource.asObservable();

  constructor(private http: HttpClient, private toastService: MessageService) {}

  /**
   * Method to fetch current weather
   */
  getCurrentWeather(): void {
    const weatherUrl = `${environment.weatherForecastApiUrl}?latitude=${this.currentUserGeoInfoSource.getValue()?.lat}&longitude=${this.currentUserGeoInfoSource.getValue()?.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timeformat=unixtime&timezone=auto`;
    this.http.get<IMeteo>(weatherUrl).subscribe({
      next: (res) => this.handleWeatherResponse(res, 'current'),
      error: (err) => this.handleError(err, 'Current weather data fetch failed')
    });
  }

  /**
   * Method to fetch weather history
   */
  getWeatherHistory(): void {
    const endDate = dayjs().subtract(3, 'day').format('YYYY-MM-DD');
    const startDate = dayjs(endDate).subtract(7, 'day').format('YYYY-MM-DD');
    const historyUrl = `${environment.weatherHistoryApiUrl}?latitude=${this.currentUserGeoInfoSource.getValue()?.lat}&longitude=${this.currentUserGeoInfoSource.getValue()?.lon}&start_date=${startDate}&end_date=${endDate}&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,temperature_2m_mean,apparent_temperature_max,apparent_temperature_min,apparent_temperature_mean,sunrise,sunset,daylight_duration,sunshine_duration,precipitation_sum,rain_sum,snowfall_sum,precipitation_hours,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timeformat=unixtime&timezone=auto`

    this.http.get<IMeteo>(historyUrl).subscribe({
      next: (res) => this.handleWeatherResponse(res, 'history'),
      error: (err) => this.handleError(err, 'Weather history fetch failed')
    });
  }

  /**
   * Method to fetch geo info (used for places names))
   */
  getGeoInfo(): void {
    const geoInfoUrl = environment.geoInfoApiUrl
    console.log(geoInfoUrl)
    this.http.get<IGeoInfo>(geoInfoUrl).subscribe({
      next: (res) => this.handleGeoInfoResponse(res),
      error: (err) => this.handleError(err, 'Geo data (external) fetch failed. You may face incorrect location names and data. Please refresh the page.')
    });
  }

  /**
   * Method to fetch user coordinates from browser api
   */
  getUserGeo(): void {
    navigator.geolocation.getCurrentPosition(
      (position) => this.handlePosition(position),
      (error) => this.handleGeolocationError(error)
    );
  }

  /**
   * Method to set new geo info when selecting custom place
   * @param geoInfo {IGeoInfo}
   */
  setNewGeoInfo(geoInfo: IGeoInfo): void {
    this.currentUserGeoInfoSource.next(geoInfo);
    this.getCurrentWeather();
    this.getWeatherHistory();
  }

  /**
   * Method to find custom places names
   * @param city {string}
   */
  findCityData(city: string): Observable<ICitySearchResult> {
    return this.http.get<ICitySearchResult>(`${environment.cityInfoApiUrl}?name=${city}&count=5&language=en&format=json`);
  }

  //** area for private methods */

  /**
   * Method to handle weather response
   * @param res {IMeteo}
   * @param type {'current' | 'history'}
   * @private
   */
  private handleWeatherResponse(res: IMeteo, type: 'current' | 'history'): void {
    if (!res) return;
    const source = type === 'current' ? this.currentWeatherSource : this.weatherHistorySource;
    source.next(res);
    this.toastService.add({severity: 'success', summary: 'Success', detail: 'Weather data fetched successfully'});
  }

  /**
   * Method to handle geo info response
   * @param res {IGeoInfo}
   * @private
   */
  private handleGeoInfoResponse(res: IGeoInfo): void {

    if (!res) return;
    if (this.currentUserCoords?.lat && this.currentUserCoords?.lon) {
      res.lat = this.currentUserCoords.lat;
      res.lon = this.currentUserCoords.lon;
    }
    this.currentUserGeoInfoSource.next(res);

    this.getCurrentWeather();
    this.getWeatherHistory();
    this.toastService.add({severity: 'success', summary: 'Success', detail: 'Geo info fetched successfully'});
  }

  /**
   * Method to handle errors
   * @param err {any}
   * @param message {string}
   * @private
   */
  private handleError(err: any, message: string): void {
    this.toastService.add({severity: 'error', summary: 'Error', detail: message});
    console.error(err);
  }

  /**
   * Method to update user position
   * @param position {GeolocationPosition}
   * @private
   */
  private handlePosition(position: GeolocationPosition): void {
    this.currentUserCoords = { lat: position.coords.latitude, lon: position.coords.longitude };
    this.getGeoInfo();
  }

  /**
   * Method to handle geolocation errors
   * @param error {GeolocationPositionError}
   * @private
   */
  private handleGeolocationError(error: GeolocationPositionError): void {
    this.toastService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Please allow geolocation and restart the page, otherwise the weather data will be less accurate',
      life: 10000
    });
    this.getGeoInfo();
    console.error(error);
  }
}
