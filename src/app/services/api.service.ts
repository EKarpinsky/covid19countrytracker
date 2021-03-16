import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, pluck, retry } from 'rxjs/operators';
import { CaseStatistics } from '../shared/models/CaseStatisticsInterface';
import { Country } from '../shared/models/CountryInterface';

// Import base URL and token from config
import { baseUrl, token, NUM_OF_COUNTRIES_DISPLAYED } from '../shared/config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'X-Access-Token': token
    })
  };

  constructor(private http: HttpClient) {
  }

  /**
   *
   * Call "Summary" endpoint on COVID-19 API, retry 3 times and catch error with handleError(),
   * select "Countries" property from returned JSON, sort by decreasing total confirmed cases,
   * select the first 10.
   *
   * All of this is handled with RxJS Observables and Operators.
   */
  getCountries(): Observable<Array<Country>> {
    return this.http.get<CaseStatistics>(`${baseUrl}/summary`, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError),
      pluck('Countries'),
      map(countries => countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)),
      map(countries => countries.slice(0, NUM_OF_COUNTRIES_DISPLAYED))
    );
  }


  // Standard Angular error handler.

  private handleError(error: HttpErrorResponse): Observable<any> {

      // Client-side error
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      // Server-side error
      console.error(
        `Error Code ${error.status}, ` +
        `Body: ${error.error}`);
    }
    return throwError(
      'An error occurred.');
  }


}
