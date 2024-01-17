import {Component, Input, OnDestroy} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MeteoService } from '../../../services/meteo.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import {NgForOf, NgIf} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {ICitySearchResultItem, IGeoInfo} from "../../../types/meteo.type";

@Component({
  selector: 'app-custom-city-select',
  standalone: true,
  imports: [FormsModule, InputTextModule, NgForOf, NgIf, DropdownModule],
  templateUrl: './custom-city-select.component.html',
  styleUrl: './custom-city-select.component.scss'
})
export class CustomCitySelectComponent implements OnDestroy {
  @Input() title: string = '';
  value: string | undefined;
  private searchSubject = new Subject<string>();
  cityList: any[] = [];
  selectedPlace: any;
  isLoading: boolean = false;
  private subscription: Subscription;

  constructor(private meteo: MeteoService) {
    this.subscription = this.searchSubject.pipe(
      debounceTime(300),
      switchMap(searchText => {
        this.isLoading = true;
        return this.meteo.findCityData(searchText);
      })
    ).subscribe(data => {
      this.cityList = data.results;
      this.isLoading = false;
    });
  }

  onSearchChange(searchValue: string | undefined): void {
    console.log('searchValue', searchValue)
    if (!searchValue) return;
    this.searchSubject.next(searchValue);
  }

  onSelectCity(city: ICitySearchResultItem): void {
    if (!city) return;
    const mutatedCity: IGeoInfo = {
        city: city.name,
        lat: city.latitude,
        lon: city.longitude,
      ...city
    }
    this.meteo.setNewGeoInfo(mutatedCity);
    console.log('Selected city:', city);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
