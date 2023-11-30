import { Component} from '@angular/core';
import { EtudiantService } from 'src/app/services/etudiant.service';
@Component({
  selector: 'app-delete-etudiant',
  templateUrl: './delete-etudiant.component.html',
 
})
export class DeleteEtudiantComponent {
  constructor(private service:EtudiantService
   ){}

   Etudiant: any;
  cinInput:string='';
  etudiantId: number; // Property to store the id

  supprimer() {
    const cin = Number(this.cinInput);
  
    this.service.getEtudiantByCin(cin).subscribe(
      (result) => {
        this.Etudiant = result;
          // Store the id in the class property
      this.etudiantId = this.Etudiant.idEtudiant;
          this.service.removeEtudiant(this.etudiantId).subscribe(
            () => {
              alert('Etudiant bien supprimé');
            },
            (error) => {
              console.error('Erreur de suppression:', error);
              alert('Erreur de suppression');
            }
          );},
      (error) => {
        console.error('Etudiant non existant.', error);
        alert('Etudiant non existant.');
      }
    );
  }
  
    
   }
     
      