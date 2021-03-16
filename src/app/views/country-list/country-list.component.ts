import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { Country } from '../../shared/models/CountryInterface';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit, OnDestroy {

  countryList: Array<Country>;
  countryListSubscription: Subscription;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {

    // Call API Service to fetch countries, subscribe to the returned Observable.
    this.countryListSubscription = this.apiService.getCountries().subscribe((countries: Array<Country>) => {
      this.countryList = countries;
    });

  }

  ngOnDestroy(): void {

    // Unsubscribe from Observable Subscription to prevent memory leaks.
    if (this.countryListSubscription) {
      this.countryListSubscription.unsubscribe();
    }
  }
}
