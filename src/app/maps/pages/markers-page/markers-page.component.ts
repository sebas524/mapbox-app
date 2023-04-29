import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
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
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;
  public zoom: number = 13;
  public map?: Map;
  public actualLngLat: LngLat = new LngLat(-74.1, 4.65);
  public actualMarkers: MarkerAndColor[] = [];

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

    this.readFromLocalStorage();

    // const marker = new Marker().setLngLat(this.actualLngLat).addTo(this.map);
  }

  createMarker() {
    if (!this.map) {
      return;
    }
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const lngLat = this.map.getCenter();
    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) {
      return;
    }
    const myMarker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.actualMarkers.push({
      color: color,
      marker: myMarker,
    });
    this.saveToLocalStorage();
    myMarker.on('dragend', () => {
      return this.saveToLocalStorage();
    });
  }

  deleteMarker(index: number) {
    this.actualMarkers[index].marker.remove();
    this.actualMarkers.splice(index, 1);
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.actualMarkers.map(
      ({ color, marker }) => {
        return {
          color: color,
          lngLat: marker.getLngLat().toArray(),
        };
      }
    );
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage() {
    const plainMarkersSring = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersSring);

    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color);
    });
  }
}
