import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {PlacesService} from '../../services/places.service';
import {IPlace} from '../../interfaces/place';
import {MapsAPILoader} from '@agm/core';
import {} from '@types/googlemaps';




@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  googlePlaceToSearch: google.maps.places.PlaceResult;
  place: IPlace;
  placesIdsList: [string];
  placesList: [IPlace];



  @ViewChild('googleSearchArea') googleSearchArea: ElementRef;

  constructor(private _placesService: PlacesService,
              private ngZone: NgZone, private  mapsAPILoader: MapsAPILoader) {

  }

  ngOnInit() {

    this.mapsAPILoader.load().then(
      () => {
        const autoComplete = new google.maps.places.Autocomplete(this.googleSearchArea.nativeElement);
        autoComplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autoComplete.getPlace();
            this.googlePlaceToSearch = place;

          });
        });
      }
    );

    this._placesService.getPlacesIdsList().subscribe(data => {
      this.placesIdsList = data;

    });



  }

  deletePlaceIdFromPlacesList(placesId: string) {
    this._placesService.deletePlaceIdFromPlacesList(placesId).subscribe(data => {
      this.placesIdsList = data;
    });
  }

  addPlaceIdToPlacesList() {
    if (!this.placesIdsList.includes(this.place.placeId)) {
      this._placesService.addPlaceIdToPlacesList(this.place.placeId, this.place.name).subscribe(data => {
        this.placesIdsList = data;
      });
    }
  }

  onGoogleSearchBtnClick() {

    const place = <IPlace>{};
    place.placeId = this.googlePlaceToSearch.place_id;
    place.name = this.googlePlaceToSearch.name;
    if (this.googlePlaceToSearch.geometry && this.googlePlaceToSearch.geometry.location) {
      place.latitude = this.googlePlaceToSearch.geometry.location.lat();
      place.longitude = this.googlePlaceToSearch.geometry.location.lng();
    }
    this.googlePlaceToSearch.address_components.forEach(component => {
      component.types.forEach(type => {
        if (type === 'country') {
          place.country = component.long_name;
        }
      });
    });

    place.imagesUrl = [] as [string];
    this.googlePlaceToSearch.photos.forEach(photo => {
      place.imagesUrl.push(photo.getUrl({maxWidth: 720, maxHeight: 480}));
    });

    this._placesService.getPlaceDescription(place.name).subscribe(placeDescription => {

      const annotations = placeDescription['annotations'];
      if (annotations !== undefined && annotations.length !== 0) {
        const first = annotations.shift();
        place.description = first['abstract'];
      }
      this.place = place;
    });
  }
}
