import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

interface MenuItem {
  name: string;
  router: string;
}

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
    {
      name: 'Alone-page',
      router: '/alone',
    },
  ];
}
