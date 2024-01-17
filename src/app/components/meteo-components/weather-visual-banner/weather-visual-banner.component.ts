import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ICurrentMeteo} from "../../../types/meteo.type";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-weather-visual-banner',
  standalone: true,
  imports: [
    NgOptimizedImage,
  ],
  templateUrl: './weather-visual-banner.component.html',
  styleUrl: './weather-visual-banner.component.scss'
})
export class WeatherVisualBannerComponent implements OnChanges {
  @Input() currentMeteo!: ICurrentMeteo | undefined;
  icon: string = '';

  weatherCodeToIcon: Record<number, { day: string; night: string }> = {
    0: { day: 'day.svg', night: 'night.svg' }, // Clear Sky
    1: { day: 'cloudy-day-1.svg', night: 'cloudy-night-1.svg' }, // Mainly Clear
    2: { day: 'cloudy-day-2.svg', night: 'cloudy-night-2.svg' }, // Partly Cloudy
    3: { day: 'cloudy-day-3.svg', night: 'cloudy-night-3.svg' }, // Overcast
    45: { day: 'cloudy.svg', night: 'cloudy.svg' }, // Fog
    48: { day: 'cloudy.svg', night: 'cloudy.svg' }, // Depositing Rime Fog
    51: { day: 'rainy-2.svg', night: 'rainy-5.svg' }, // Light Drizzle
    53: { day: 'rainy-1.svg', night: 'rainy-4.svg' }, // Moderate Drizzle
    55: { day: 'rainy-3.svg', night: 'rainy-6.svg' }, // Dense Intensity Drizzle
    56: { day: 'rainy-3.svg', night: 'rainy-6.svg' }, // Light Freezing Drizzle
    57: { day: 'rainy-6.svg', night: 'rain-7.svg' }, // Dense Intensity Freezing Drizzle
    61: { day: 'rainy-4.svg', night: 'rainy-7.svg' }, // Slight Rain
    63: { day: 'rainy-5.svg', night: 'rainy-7.svg' }, // Moderate Rain
    65: { day: 'rainy-6.svg', night: 'rainy-7.svg' }, // Heavy Rain
    66: { day: 'light-freezing-rain.svg', night: 'light-freezing-rain.svg' }, // Light Freezing Rain
    67: { day: 'heavy-freezing-rain.svg', night: 'heavy-freezing-rain.svg' }, // Heavy Freezing Rain
    71: { day: 'snowy-2.svg', night: 'snowy-5.svg' }, // Light Snowfall
    73: { day: 'snowy-1.svg', night: 'snowy-4.svg' }, // Moderate Snowfall
    75: { day: 'snowy-3.svg', night: 'snowy-6.svg' }, // Heavy Snowfall
    77: { day: 'snowy-4.svg', night: 'snowy-4.svg' }, // Snow Grains
    80: { day: 'rainy-3.svg', night: 'rainy-7.svg' }, // Slight Rain Showers
    81: { day: 'rainy-3.svg', night: 'rainy-7.svg' }, // Moderate Rain Showers
    82: { day: 'rainy-3.svg', night: 'rainy-7.svg' }, // Violent Rain Showers
    85: { day: 'snowy-4.svg', night: 'snowy-6.svg' }, // Light Snow Showers
    86: { day: 'snowy-4.svg', night: 'snowy-6.svg' }, // Heavy Snow Showers
    95: { day: 'thunder.svg', night: 'thunder.svg' }, // Slight/Moderate Thunderstorm
    96: { day: 'thunder.svg', night: 'thunder.svg' }, // Thunderstorm with Light Hail
    99: { day: 'thunder.svg', night: 'thunder.svg' } // Thunderstorm with Heavy Hail
  };
  ngOnChanges(): void {
    this.selectIcon();
  }

  selectIcon(): void {
    if (!this.currentMeteo) return;
    const timeOfDay = this.currentMeteo.is_day === 1 ? 'day' : 'night';
    const weatherIcon = this.weatherCodeToIcon[this.currentMeteo.weather_code];

    if (weatherIcon) {
      this.icon = weatherIcon[timeOfDay];
    } else {
      this.icon = 'default.svg'; // Fallback icon
    }
  }
}
