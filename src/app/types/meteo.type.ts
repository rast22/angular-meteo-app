interface IMeteo {
  current: ICurrentMeteo;
  current_units: ICurrentUnits;
  daily: IDailyMeteo;
  daily_units: IDailyUnits;
  elevation: number;
  generationtime_ms: number;
  hourly: IHourlyMeteo;
  hourly_units: IHourlyUnits;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_hours: number;
}

interface ICurrentMeteo {
  apparent_temperature: number;
  cloud_cover: number;
  interval: number;
  is_day: number;
  precipitation: number;
  pressure_msl: number;
  rain: number;
  relative_humidity_2m: number;
  showers: number;
  snowfall: number;
  surface_pressure: number;
  temperature_2m: number;
  time: string;
  weather_code: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
  wind_speed_10m: number;
}

interface ICurrentUnits {
  apparent_temperature: string;
  cloud_cover: string;
  interval: string;
  is_day: string;
  precipitation: string;
  pressure_msl: string;
  rain: string;
  relative_humidity_2m: string;
  showers: string;
  snowfall: string;
  surface_pressure: string;
  temperature_2m: string;
  time: string;
  weather_code: string;
  wind_direction_10m: string;
  wind_gusts_10m: string;
  wind_speed_10m: string;
}

interface IDailyMeteo {
  daylight_duration: Array<number>;
  sunrise: Array<string>;
  sunset: Array<string>;
  sunshine_duration: Array<number>;
  time: Array<number>;
  weather_code: Array<number>;
  temperature_2m_max: Array<number>;
  precipitation_sum: Array<number>;
  wind_speed_10m_max: Array<number>;
}

interface IDailyUnits {
  daylight_duration: string;
  sunrise: string;
  sunset: string;
  sunshine_duration: string;
  time: string;
  weather_code: string;
  wind_speed_10m_max: string;
  precipitation_sum: string;
  temperature_2m_max: string;
}

interface IHourlyMeteo {
  temperature_2m: Array<number>;
  apparent_temperature: Array<number>;
  relative_humidity_2m: Array<number>;
  wind_speed_10m: Array<number>;
  time: Array<string>;
}

interface IHourlyUnits {
  temperature_2m: string;
  time: string;
}

interface IGeoInfo {
  status?: string;
  continent?: string;
  country?: string;
  countryCode?: string;
  regionName?: string;
  city: string;
  zip?: string;
  lat: number;
  lon: number;
  timezone?: string;
  query?: string;
}

interface ICitySearchResult {
  generationtime_ms: number;
  results: Array<ICitySearchResultItem>;
}

interface ICitySearchResultItem {
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
  name: string;
}



export {IMeteo, ICurrentMeteo, ICurrentUnits, IDailyMeteo, IDailyUnits, IHourlyMeteo, IHourlyUnits, IGeoInfo, ICitySearchResult, ICitySearchResultItem};
