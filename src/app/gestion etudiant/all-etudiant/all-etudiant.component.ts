import { Component, OnInit, SimpleChanges } from '@angular/core';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { Etudiant } from 'src/app/models/etudiant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-etudiant',
  templateUrl: './all-etudiant.component.html',
  styleUrls: ['./all-etudiant.component.scss']
})
export class AllEtudiantComponent implements OnInit {
  Etudiants: Etudiant[] = [];
  search = '';
  Etudiant: any;

  constructor(private service: EtudiantService, private router: Router) {}

  ngOnInit(): void {
    this.getall();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)   
   }
  getall(): void {
    this.service.getEtudiantList().subscribe((Etudiants) => {
      console.log('La liste des étudiants:', Etudiants);
      this.Etudiants = Etudiants;
    });
  }

  generateQRCodeForEtudiants(): void {
    const dataToEncode = JSON.stringify(this.Etudiants);

    // Save data to local storage so it can be retrieved in QRcodeEtudiantComponent
    localStorage.setItem('qrCodeData', dataToEncode);

    this.router.navigate(['etudiant/qrcode-etudiant']);
  }
}
