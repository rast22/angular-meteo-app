import {ChangeDetectorRef, Component, Input, OnDestroy} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MeteoService } from '../../../services/meteo.service';
import {catchError, distinctUntilChanged, filter, of, Subject, Subscription, tap} from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import {NgForOf, NgIf} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {ICitySearchResultItem, IGeoInfo} from "../../../types/meteo.type";
import {MessageService} from "primeng/api";

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
  inputValue: string | undefined;
  cityList: Array<ICitySearchResultItem> = [];
  selectedPlace: any;
  isLoading: boolean = false;
  private subscription: Subscription;

  constructor(private meteo: MeteoService, private cdr: ChangeDetectorRef, private toast: MessageService) {
    this.subscription = this.searchSubject.pipe(
      filter(searchText => searchText.length > 0),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchText => {
        this.isLoading = true;
        return this.meteo.findCityData(searchText).pipe(
          tap(() => this.isLoading = false), // Turn off loading indicator on success
          catchError(err => {
            this.toast.add({severity: 'error', summary: 'Error', detail: 'Failed to fetch city data'});
            this.isLoading = false; // Turn off loading indicator on error
            console.error(err); // Optional, for logging the error
            return []; // Return an empty array or appropriate observable to recover from the error
          })
        );
      })
    ).subscribe(data => {
      this.cityList = data.results;
      this.isLoading = false;
    });
  }

  /**
   * Search for city in openmeteo api
   * @param searchValue
   */
  onSearchChange(searchValue: string | undefined): void {
    this.inputValue = searchValue;
    if (searchValue) {
      this.searchSubject.next(searchValue);
    } else {
      this.clearInput();
    }
  }

  /**
   * Select city from dropdown and get geo data
   * @param city
   */
  onSelectCity(city: ICitySearchResultItem): void {
    if (!city) return;
    this.selectedPlace = city;
    this.inputValue = city.name;
    const mutatedCity: IGeoInfo = {
        city: city.name,
        lat: city.latitude,
        lon: city.longitude,
      ...city
    }
    this.meteo.setNewGeoInfo(mutatedCity);
  }

  clearInput(): void {
    this.inputValue = '';
    this.selectedPlace = null;
    this.cityList = [];
    this.cdr.markForCheck()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
