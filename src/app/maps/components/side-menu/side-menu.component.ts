import { Component } from '@angular/core';

interface MenuItem {
  name: string;
  router: string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styles: [],
})
export class SideMenuComponent {
  public menuOptions: MenuItem[] = [
    {
      name: 'Full Screen',
      router: '/maps/fullscreen',
    },
    {
      name: 'Zoom Range',
      router: '/maps/zoom',
    },
    {
      name: 'Markers',
      router: '/maps/markers',
    },
    {
      name: 'Houses',
      router: '/maps/properties',
    },
  ];
}
