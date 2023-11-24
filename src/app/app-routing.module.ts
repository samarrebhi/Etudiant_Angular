import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import {FoyerDeleteComponent} from "./foyer-delete/foyer-delete.component";
import {FoyerUpdateComponent} from "./foyer-update/foyer-update.component";
import {FoyerAddComponent} from "./foyer-add/foyer-add.component";
import {FoyerListComponent} from "./foyer-list/foyer-list.component";
import {BlocListComponent} from "./bloc-list/bloc-list.component";

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/Foyer',
        pathMatch: 'full',
      },
      { path: '', redirectTo: '/Foyer', pathMatch: 'full' },
      {path:'c1',component:BlocListComponent},
      {path:'Foyer',component:FoyerListComponent},
      {path:'Foyer/add',component:FoyerAddComponent},
      {path:'Foyer/:id',component:FoyerUpdateComponent},
      { path: 'Foyer/delete/:id', component: FoyerDeleteComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
