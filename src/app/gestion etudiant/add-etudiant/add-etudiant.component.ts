import { Component } from '@angular/core';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { Etudiant } from 'src/app/models/etudiant';

@Component({
  selector: 'app-add-etudiant',
  templateUrl: './add-etudiant.component.html',
  styleUrls: ['./add-etudiant.component.scss']
})
export class AddEtudiantComponent {
  
  Etudiant=new Etudiant()


  constructor(private EtudiantService: EtudiantService)
   {}
  
  showForm(f:any){
    console.log(f);}
  

// tester les inputs 
show(u:Etudiant){
  console.log('Form value:', u);

}
// ajouter l'étudiant
saveEtudiant(u:Etudiant){
this.EtudiantService.addEtudiant(u).subscribe(
  (response) => {
   
    console.log('Response from server:', response);
    alert('etudiant ajouté');
  },
  (error) => {
    console.error('Error adding Etudiant:', error);}
);
;
}
}
