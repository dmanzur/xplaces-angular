import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {keys} from '../keys';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private baseUrl = keys['server'] + 'manager/places/';


  constructor(private http: HttpClient) {}

  public getPlaceDescription(placeName: string): Observable<string> {
    const dandelionApiKey = keys['dandelionKey'];
    const encodedPlaceName = encodeURI(placeName);
    const address = 'https://api.dandelion.eu/datatxt/nex/v1/?lang=en&text=' + encodedPlaceName + '&include=abstract&token=' + dandelionApiKey;
    return this.http.get<string>(address);
  }

  public addPlaceIdToPlacesList(placeId: string, name: string): Observable<[string]> {
    const address = this.baseUrl + 'add/' + placeId + '/' + name;
    return this.http.get<[string]>(address);
  }

  public deletePlaceIdFromPlacesList(placeId: string): Observable<[string]> {
    const address = this.baseUrl + 'delete/' + placeId;
    return this.http.get<[string]>(address);
  }

  public getPlacesIdsList(): Observable<[string]> {
    const address = this.baseUrl ;
    return this.http.get<[string]>(address);
  }

}
