import { Routes } from '@angular/router';

import { AboutPageComponent } from './pages/about-page.component';
import { HomePageComponent } from './pages/home-page.component';
import { ProjectsPageComponent } from './pages/projects-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Home · Alexander Nachtmann',
  },
  {
    path: 'projects',
    component: ProjectsPageComponent,
    title: 'Projects · Alexander Nachtmann',
  },
  {
    path: 'about',
    component: AboutPageComponent,
    title: 'About · Alexander Nachtmann',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
