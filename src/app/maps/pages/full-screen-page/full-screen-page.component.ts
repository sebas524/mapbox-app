import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  selector: 'app-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styles: [
    `
      div {
        width: 100vw;
        height: 100vh;
        background-color: gray;
      }
    `,
  ],
})
export class FullScreenPageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;
  ngAfterViewInit(): void {
    // * afterViewInit means after view has been initialized, which means,once you have all html refrences loaded, then:

    console.log(this.divMap);
    if (!this.divMap) {
      throw "html element wasn't found";
    }

    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }
}
