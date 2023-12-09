// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'etudiant',
        loadChildren: () =>
          import('../app/gestion etudiant/etudiant/etudiant.module').then(
            (m) => m.EtudiantModule
          ),
      },
    ],
  },
  // Add other top-level routes if needed
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
