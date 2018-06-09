import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataStorageProvider {
  public places: Array<any>;

  constructor(
    public http: HttpClient,
    public storage: Storage) {
    this.places = this.getPlaces();
  }

  getPlaces(): Array<any> {
    this.storage.get("places").then(
      data => { return data },
      error => { console.error(error); return error }
    );
    return null;
  }

  savePlaces() {
    this.storage.set("places", this.places);
  }
}
