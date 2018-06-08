import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataStorageProvider {
  public places: any;

  constructor(
    public http: HttpClient,
    public storage: Storage) {
      this.places = this.getPlaces();
  }

  getPlaces() {
    return this.storage.get("places");
  }

  savePlaces(){
    this.storage.set("places", this.places);
  }
}
