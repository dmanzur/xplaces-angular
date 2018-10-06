import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {PlacesComponent} from './components/places/places.component';
import {UsersComponent} from './components/users/users.component';
import {StatisticsComponent} from './components/statistics/statistics.component';


const routes: Routes = [
  {path: '', redirectTo: '/home/places', pathMatch: 'full'},
  {path: 'home/places', component: PlacesComponent},
  {path: 'home/users', component: UsersComponent},
  {path: 'home/statistics', component: StatisticsComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [
  PageNotFoundComponent, UsersComponent, PlacesComponent, StatisticsComponent
];
