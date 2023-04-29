import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LngLat, Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  selector: 'app-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styles: [
    `
      #map {
        width: 100vw;
        height: 100vh;
        background-color: gray;
      }
    `,
  ],
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') divMap?: ElementRef;
  public zoom: number = 10;
  public map?: Map;
  public actualLngLat: LngLat = new LngLat(-74.5, 40);

  ngAfterViewInit(): void {
    // * afterViewInit means after view has been initialized, which means,once you have all html refrences loaded, then:

    console.log(this.divMap);
    if (!this.divMap) {
      throw "html element wasn't found";
    }

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.actualLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }

  mapListeners() {
    if (!this.map) {
      throw "map hasn't been initialized";
    }

    this.map.on('zoom', (event) => {
      console.log(event);
      this.zoom = this.map!.getZoom();
    });
    this.map.on('zoomend', (event) => {
      if (this.map!.getZoom() < 18) {
        return;
      }
      this.map!.zoomTo(18);
    });
    this.map.on('move', () => {
      this.actualLngLat = this.map!.getCenter();
      console.log(this.actualLngLat);
    });
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  zoomIn() {
    this.map?.zoomIn();
  }
  zoomOut() {
    this.map?.zoomOut();
  }
  zoomChanged(value: string) {
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }
}
