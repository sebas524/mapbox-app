import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Map, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styles: [
    `
      div {
        width: 100%;

        height: 150px;
        margin: 0px;
        background-color: red;
      }
    `,
  ],
})
export class MiniMapComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;

  @Input() lngLat?: [number, number];
  public map?: Map;

  ngAfterViewInit(): void {
    if (!this.divMap?.nativeElement) {
      throw 'Map Div not found';
    }
    if (!this.lngLat) {
      throw 'LngLat cannot be null!';
    }

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false,
    });

    new Marker().setLngLat(this.lngLat).addTo(this.map);
  }
}
