import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  getWeather() {
    // return this.http.get('https://swapi.co/api/films');
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?id=7778677&APPID=ec44e7ff2e0597cf35d85dd13062e22d');
  }
}
