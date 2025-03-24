import { Routes } from '@angular/router';
import { BlogsComponent } from './components/blogs/blogs.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CarComponent } from './components/car/car.component';
import { ReservationComponent } from './components/reservations/reservations.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'cars', component: CarComponent },
      { path: 'reservations', component: ReservationComponent },
      { path: 'blogs', component: BlogsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: '', redirectTo: 'cars', pathMatch: 'full' }, // Default route
    ],
  },
  { path: '**', redirectTo: '' }, // Redirect to default route if path doesn't exist
];