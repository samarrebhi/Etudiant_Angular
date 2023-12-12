// etudiant.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtudiantRoutingModule } from './etudiant-routing.module';

import { AllEtudiantComponent } from '../all-etudiant/all-etudiant.component';
import { AddEtudiantComponent } from '../add-etudiant/add-etudiant.component';
import { DeleteEtudiantComponent } from '../delete-etudiant/delete-etudiant.component';
import { QRcodeEtudiantComponent } from '../qrcode-etudiant/qrcode-etudiant.component';
import { UpdateEtudiantComponent } from '../update-etudiant/update-etudiant.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { ColorChangeDirective } from 'src/app/color-change.directive';

@NgModule({
  declarations: [
    QRcodeEtudiantComponent,
    AllEtudiantComponent,
    AddEtudiantComponent,
    DeleteEtudiantComponent,
    UpdateEtudiantComponent,
    ColorChangeDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    EtudiantRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class EtudiantModule {}
