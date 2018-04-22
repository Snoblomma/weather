import {AutoCompleteService} from 'ionic2-auto-complete';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

@Injectable()
export class ApiProvider implements AutoCompleteService {
  labelAttribute = "name";

  constructor(
    public httpClient: HttpClient,
    private http:Http) {
    console.log('Hello ApiProvider Provider');
  }

  getWeather() {
    return this.httpClient.get('http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=ec44e7ff2e0597cf35d85dd13062e22d');
  }

  getResults(keyword:string) {
    return this.http.get("https://restcountries.eu/rest/v1/name/"+keyword)
      .map(
        result =>
        {
          return result.json()
            .filter(item => item.name.toLowerCase().startsWith(keyword.toLowerCase()) )
        });
  }
}
