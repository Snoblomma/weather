import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

@Injectable()
export class ApiProvider {
  public placeDetails: any;
  public distance: any

  constructor(
    private httpClient: HttpClient,
    private http: Http) {
  }

  getCurrentWeatherCoordinates(lat: string, lon: string) {
    return this.httpClient.get('https://api.apixu.com/v1/current.json?key=ef9bc2cafed948a69d6162938181006&q=' + lat + ',' + lon);
  }

  getForecastWeatherCoordinates(lat: string, lon: string, days: string) {
    return this.httpClient.get('https://api.apixu.com/v1/forecast.json?key=ef9bc2cafed948a69d6162938181006&q=' + lat + ',' + lon + '&days=' + days).toPromise();
  }

  getCities(keyword: string) {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + keyword + '&types=(cities)&key=AIzaSyCoXe1dZzmHjeIWyxKB2XQlvLdKAZ7WUOw');
  }

  getPlaces(keyword: string) {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + keyword + '&key=AIzaSyCoXe1dZzmHjeIWyxKB2XQlvLdKAZ7WUOw');
  }

  getPlacesListLocalBackend() {
    return this.httpClient.get('https://agile-springs-70240.herokuapp.com/api/place/').toPromise();
  }

  getPlaceBackend(resource_uri) {
    return this.httpClient.get('https://agile-springs-70240.herokuapp.com' + resource_uri).toPromise();
  }

  getPlaceDetails(placeId: string) {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeId + '&key=AIzaSyCoXe1dZzmHjeIWyxKB2XQlvLdKAZ7WUOw').toPromise();
  }

  getPlacePhoto(photoreference: string) {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + photoreference + '&key=AIzaSyCoXe1dZzmHjeIWyxKB2XQlvLdKAZ7WUOw');
  }

  getPhotoString(photoreference: string) {
    return 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + photoreference + '&key=AIzaSyCoXe1dZzmHjeIWyxKB2XQlvLdKAZ7WUOw';
  }

  getDistanceFromHome(lat: string, lng: string) {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=53.2472036,-6.182852100000001&destinations=' + lat + ',' + lng + '&key=AIzaSyCoXe1dZzmHjeIWyxKB2XQlvLdKAZ7WUOw').toPromise();
  }

  getDistance() {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=53.2472036,-6.182852100000001&destinations=52.67698000000001,-7.20547&key=AIzaSyCoXe1dZzmHjeIWyxKB2XQlvLdKAZ7WUOw');
  }

  addPlace(place_id, name, visited, categories) {
    var data = {
      "place_id": place_id,
      "name": name,
      "types": categories,
      "visited": visited
    };

    this.httpClient.post('https://agile-springs-70240.herokuapp.com/api/place/', data).subscribe(
      value => console.log(value),
      error => console.log(error)
    )
  }

  updatePlace(resource_uri, place_id, name, visited, categories) {
    console.log(categories);
    var data = {
      "place_id": place_id,
      "name": name,
      "types": categories,
      "visited": visited
    };

    this.httpClient.put('https://agile-springs-70240.herokuapp.com' + resource_uri, data).subscribe(
      value => console.log(value),
      error => console.log(error)
    )
  }

  removePlace(resource_uri) {
    let link = 'https://agile-springs-70240.herokuapp.com' + resource_uri;
    this.http.delete(link).subscribe(
      value => console.log(value),
      error => console.log(error)
    );
  }
}
