import {Component, OnInit} from '@angular/core';
import {FoyerService} from "../../services/foyer.service";
import {Foyer} from "../../models/Foyer";
import {BlocService} from "../../services/bloc.service";
import {UniversiteService} from "../../services/universite.service";
import {Universite} from "../../models/Universite";
import {Bloc} from "../../models/Bloc";
import {Router} from "@angular/router";

@Component({
  selector: 'app-foyer-add',
  templateUrl: './foyer-add.component.html',
  styleUrls: ['./foyer-add.component.css']
})
export class FoyerAddComponent implements OnInit {

  foyer: Foyer = new Foyer();
  universites: Universite[] = [];
  blocs: Bloc[] = [];
  selectedBlocs: Bloc[][] = [[]]; // Initialize with an empty dropdown
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }


  uploadImage(idFoyer:any){
    if (this.selectedFile) {
      console.log("ENTER");
      let formData = new FormData();
      formData.append('file', this.selectedFile,this.selectedFile.name);
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      this.foyerService.uploadImg(formData,idFoyer).subscribe(
        (data) =>{
          console.log(data);
        }
      )
    }}

  constructor(
    private foyerService: FoyerService,
    private universiteService: UniversiteService,
    private blocService: BlocService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUniversites();
    this.loadBlocs();
  }

  saveUser(): void {
    // Extract ids from selectedBlocs
    const idBloc: number[] = this.selectedBlocs.flatMap(blocs => blocs.map(bloc => bloc.idBloc));

    this.foyerService.addFoyerAndAssociateUniversiteAndBloc(
      this.foyer,
      this.foyer.universite.idUniversite,
      idBloc // Pass the flat array of bloc ids

    ).subscribe(
      (response) => {
        alert('Added successfully and associated with university and bloc');
        this.uploadImage(response.idFoyer)
        this.router.navigate(['/Foyer']);
      },
      (error) => {
        console.error('Failed to add and associate with university and bloc:', error);
        alert('Failed to add and associate with university and bloc');
      }
    );
  }

  private loadUniversites(): void {
    this.universiteService.getUniversite().subscribe(
      (data) => {
        this.universites = data;
      },
      (error) => {
        console.error('Failed to load universites:', error);
      }
    );
  }

  private loadBlocs(): void {
    this.blocService.getBlocs().subscribe(
      (data) => {
        this.blocs = data;
      },
      (error) => {
        console.error('Failed to load blocs:', error);
      }
    );
  }

  addDropdown(): void {
    this.selectedBlocs.push([...this.selectedBlocs[0]]); // Clone the first dropdown
  }

  removeDropdown(index: number): void {
    if (this.selectedBlocs.length > 1) {
      this.selectedBlocs.splice(index, 1); // Remove the dropdown at the specified index
    } else {
      alert('At least one Bloc must be choosen.');
    }
  }

}

