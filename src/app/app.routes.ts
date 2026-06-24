import { Routes } from '@angular/router';

import { AboutPageComponent } from './pages/about-page.component';
import { HomePageComponent } from './pages/home-page.component';
import { ProjectsPageComponent } from './pages/projects-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Home | Portfolio',
  },
  {
    path: 'projects',
    component: ProjectsPageComponent,
    title: 'Projects | Portfolio',
  },
  {
    path: 'about',
    component: AboutPageComponent,
    title: 'About | Portfolio',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
