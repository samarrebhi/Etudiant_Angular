import { Component,OnInit } from '@angular/core';
import { Etudiant } from 'src/app/models/etudiant';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-etudiant',
  templateUrl: './update-etudiant.component.html',
  styleUrls: ['./update-etudiant.component.scss']
})
export class UpdateEtudiantComponent {
  constructor(private service:EtudiantService,
    private route: ActivatedRoute,
   ){}
     
    Etudiant: any;
    cinInput:string='';
    etudiantId: number; // Property to store the id

   
    trouver(){
    const cin = Number(this.cinInput);
      
      // Fetch data by cin from the service
      this.service.getEtudiantByCin(cin).subscribe((result) => {
        this.Etudiant = result;
        console.log(result);
       
         // Store the id in the class property
      this.etudiantId = this.Etudiant.idEtudiant;
      });
    }
    
   // test form values yetkraw wale before updating 
  show(u:Etudiant){
    console.log('Form value:', u);

  }
    onSubmit(u:Etudiant){
      const id= Number(this.etudiantId);
            this.service.updateEtudiant(u,id).subscribe();
           
            alert('Etudiant '+this.cinInput+' bien modifié')
   
  }
}
