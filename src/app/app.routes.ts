import { Routes } from '@angular/router';
import { CarResolver } from './car.resolver';
import { CarListComponent } from './car-list/car-list.component';
import { CarDetailComponent } from './car-detail/car-detail.component';

export const routes: Routes = [
  { path: '', component: CarListComponent },
  {
    path: 'car/:id',
    component: CarDetailComponent,
    resolve: { car: CarResolver },
  },
];
