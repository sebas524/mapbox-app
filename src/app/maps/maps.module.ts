import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { MapsLayoutPageComponent } from './layout/maps-layout-page/maps-layout-page.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';

import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { CounterAloneComponent } from '../alone/components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '../alone/components/side-menu/side-menu.component';

(mapboxgl as any).accessToken =
  'pk.eyJ1Ijoic2ViYXM1MjQiLCJhIjoiY2xld3hxNjJmMGxhZjN5bzRpZGEydzcyayJ9.mr99a05JzHH9rLHDuHLTpg';

@NgModule({
  declarations: [
    MiniMapComponent,
    MapsLayoutPageComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent,
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    CounterAloneComponent,
    SideMenuComponent,
  ],
})
export class MapsModule {}
